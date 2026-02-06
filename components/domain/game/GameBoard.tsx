import {
  validateEnergyCollection,
  applyEnergyCollection,
  mustDiscardEnergy,
  canAffordNode,
  generateNodePayment,
  applyNodePurchase,
  applyNodeReservation,
  applyEnergyDiscard,
  applyProtocolClaim,
  checkWinConditions,
  getDrawOptions,
  applyDrawEffect,
  applySwapEffect,
  applyExchangeEnergy,
  canExchangeEnergy,
} from "@/logic/gameEngine";
import { ENERGY_LIMIT } from "@/logic/rules";
import { getTotalEnergy } from "@/logic/selectors";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { EnergyPool } from "./EnergyPool/EnergyPool";
import { EnergyDiscardModal } from "./EnergyPool/EnergyDiscardModal";
import { ExchangeModal } from "./EnergyPool/ExchangeModal";
import { GameState, Player, EnergyType, Protocol, Node } from "./game.types";
import { createGameBoardStyles } from "./gameBoard.styles";
import { NodeCard } from "./NodeCard/NodeCard";
import { NodeDetailModal } from "./NodeCard/NodeDetailModal";
import { PlayerArea } from "./PlayerArea/PlayerArea";
import { ProtocolCard } from "./ProtocolCard/ProtocolCard";
import { Text } from "@/components/ui/Text/Text";
import { AlertModal } from "@/components/ui/Modal/AlertModal";
import { DrawModal } from "./Effects/DrawModal";
import { SwapModal } from "./Effects/SwapModal";
import { useTheme } from "@/hooks/useTheme";
import { useSound } from "@/hooks/useSound";

interface GameBoardProps {
  gameState: GameState;
  selectedTab: "market" | "protocols" | "players";
  onUpdateGameState: (nextState: GameState) => void;
  onEndGame: (winner: Player) => void;
}

export function GameBoard({
  gameState,
  selectedTab,
  onUpdateGameState,
  onEndGame,
}: GameBoardProps) {
  const { theme } = useTheme();
  const { play } = useSound();
  const gameBoardStyles = useMemo(() => createGameBoardStyles(theme), [theme]);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyType[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [discardCount, setDiscardCount] = useState(0);
  const [discardSelection, setDiscardSelection] = useState<EnergyType[]>([]);
  const [pendingDraw, setPendingDraw] = useState<Node[] | null>(null);
  const [pendingDrawCategory, setPendingDrawCategory] = useState<
    Node["category"] | null
  >(null);
  const [pendingSwap, setPendingSwap] = useState(0);
  const [postEffectState, setPostEffectState] = useState<GameState | null>(
    null,
  );
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [exchangeMode, setExchangeMode] = useState<"one" | "two">("one");
  const [exchangeTakeType, setExchangeTakeType] = useState<Exclude<
    EnergyType,
    "flux"
  > | null>(null);
  const [exchangeGiveSelection, setExchangeGiveSelection] = useState<
    Exclude<EnergyType, "flux">[]
  >([]);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const modalStateRef = useRef({
    node: false,
    exchange: false,
    draw: false,
    swap: false,
  });

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isPlayerTurn = !currentPlayer.isBot;

  const openAlert = useCallback((title: string, message: string) => {
    play("error_pop");
    setAlertState({ isOpen: true, title, message });
  }, [play]);

  const handleCloseAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const advanceTurn = useCallback(
    (nextState: GameState) => {
      const winner = checkWinConditions(nextState);
      if (winner) {
        onEndGame(winner);
        return;
      }

      const updatedState = { ...nextState };
      updatedState.currentPlayerIndex =
        (updatedState.currentPlayerIndex + 1) % updatedState.players.length;
      updatedState.turnCount = (updatedState.turnCount || 0) + 1;

      onUpdateGameState(updatedState);
    },
    [onEndGame, onUpdateGameState],
  );

  function handleEnergyToggle(type: EnergyType) {
    play("secondary_click");
    setSelectedEnergy((prev) => {
      const countOfType = prev.filter((item) => item === type).length;
      if (countOfType === 2) {
        return prev.filter((item) => item !== type);
      }
      if (countOfType === 1) {
        const isOnlySelection = prev.length === 1;
        if (
          isOnlySelection &&
          type !== "flux" &&
          gameState.energyPool[type] >= 4
        ) {
          return [...prev, type];
        }
        const index = prev.indexOf(type);
        if (index !== -1) {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        }
        return prev;
      }

      if (prev.length >= 3) {
        return prev;
      }

      if (prev.length === 2) {
        const unique = new Set(prev);
        if (unique.size === 1) {
          return prev;
        }
        if (type === "flux") {
          return prev;
        }
        return [...prev, type];
      }

      if (prev.length === 1) {
        const existing = prev[0];
        if (existing === "flux" || type === "flux") {
          return prev;
        }
        return [...prev, type];
      }

      return [type];
    });
  }

  function handleCollectEnergy() {
    if (isDiscarding) {
      openAlert(
        "Discard required",
        `Discard ${discardCount} energy before taking another action.`,
      );
      return;
    }

    const validation = validateEnergyCollection(
      selectedEnergy,
      gameState.energyPool,
    );
    if (!validation.valid) {
      openAlert(
        "Invalid action",
        validation.error || "Invalid energy collection",
      );
      return;
    }

    const nextState = applyEnergyCollection(
      gameState,
      currentPlayer,
      selectedEnergy,
    );
    const updatedPlayer = nextState.players[nextState.currentPlayerIndex];
    if (mustDiscardEnergy(updatedPlayer)) {
      const overBy = Math.max(getTotalEnergy(updatedPlayer) - ENERGY_LIMIT, 0);
      onUpdateGameState(nextState);
      setIsDiscarding(true);
      setDiscardCount(overBy);
      setDiscardSelection([]);
      setSelectedEnergy([]);
      return;
    }

    setSelectedEnergy([]);
    play("primary_click");
    advanceTurn(nextState);
  }

  const handleOpenExchange = useCallback(() => {
    if (isDiscarding) {
      openAlert(
        "Discard required",
        `Discard ${discardCount} energy before taking another action.`,
      );
      return;
    }
    setExchangeMode("one");
    setExchangeTakeType(null);
    setExchangeGiveSelection([]);
    setIsExchangeOpen(true);
  }, [discardCount, isDiscarding, openAlert]);

  const handleCloseExchange = useCallback(() => {
    setIsExchangeOpen(false);
  }, []);

  const handleExchangeModeChange = useCallback((mode: "one" | "two") => {
    setExchangeMode(mode);
    setExchangeGiveSelection([]);
  }, []);

  const handleExchangeTakeType = useCallback(
    (type: Exclude<EnergyType, "flux">) => {
      setExchangeTakeType(type);
    },
    [],
  );

  const handleExchangeGiveToggle = useCallback(
    (type: Exclude<EnergyType, "flux">) => {
      setExchangeGiveSelection((prev) => {
        const next = [...prev];
        const index = next.indexOf(type);
        const maxGive = exchangeMode === "two" ? 3 : 1;
        if (index !== -1) {
          next.splice(index, 1);
          return next;
        }
        if (next.length >= maxGive) {
          return next;
        }
        if (currentPlayer.energy[type] <= 0) {
          return next;
        }
        return [...next, type];
      });
    },
    [currentPlayer.energy, exchangeMode],
  );

  const handleConfirmExchange = useCallback(() => {
    if (!exchangeTakeType) {
      openAlert("Exchange error", "Select an energy to take.");
      return;
    }
    const takeCount = exchangeMode === "two" ? 2 : 1;
    const canExchange = canExchangeEnergy(
      gameState,
      currentPlayer,
      exchangeTakeType,
      takeCount,
      exchangeGiveSelection,
    );
    if (!canExchange) {
      openAlert(
        "Exchange error",
        "Cannot complete this exchange with current pool or energy.",
      );
      return;
    }
    const nextState = applyExchangeEnergy(
      gameState,
      currentPlayer,
      exchangeTakeType,
      takeCount,
      exchangeGiveSelection,
    );
    setIsExchangeOpen(false);
    play("primary_click");
    advanceTurn(nextState);
  }, [
    advanceTurn,
    currentPlayer,
    exchangeGiveSelection,
    exchangeMode,
    exchangeTakeType,
    gameState,
    openAlert,
    play,
  ]);

  const handleNodePress = useCallback(
    (node: Node) => {
      if (isDiscarding) {
        openAlert(
          "Discard required",
          `Discard ${discardCount} energy before taking another action.`,
        );
        return;
      }
      setSelectedEnergy([]);
      setSelectedNode(node);
      setIsNodeModalOpen(true);
    },
    [discardCount, isDiscarding, openAlert],
  );

  const handleReservedNodePress = useCallback(
    (node: Node) => {
      handleNodePress(node);
    },
    [handleNodePress],
  );

  function handleBuildNode(node: Node) {
    if (isDiscarding) {
      openAlert(
        "Discard required",
        `Discard ${discardCount} energy before taking another action.`,
      );
      return;
    }
    if (!canAffordNode(node, currentPlayer)) {
      openAlert("Insufficient energy", "Not enough energy to build this node.");
      return;
    }

    const payment = generateNodePayment(node, currentPlayer);
    if (!payment) {
      openAlert("Payment error", "Cannot generate a valid payment.");
      return;
    }

    const nextState = applyNodePurchase(
      gameState,
      currentPlayer,
      node,
      payment,
    );
    setIsNodeModalOpen(false);
    setSelectedNode(null);
    play("success_sparkle");

    const updatedPlayer = nextState.players[nextState.currentPlayerIndex];
    if (updatedPlayer.pendingEffects.draw > 0) {
      const options = getDrawOptions(
        nextState,
        node.category,
        updatedPlayer.pendingEffects.draw,
      );
      if (options.length === 0) {
        const clearedState = {
          ...nextState,
          players: nextState.players.map((player, index) => {
            if (index !== nextState.currentPlayerIndex) {
              return player;
            }
            return {
              ...player,
              pendingEffects: { ...player.pendingEffects, draw: 0 },
            };
          }),
        };
        if (updatedPlayer.pendingEffects.swap > 0) {
          setPostEffectState(clearedState);
          setPendingSwap(updatedPlayer.pendingEffects.swap);
          return;
        }
        advanceTurn(clearedState);
        return;
      }
      setPostEffectState(nextState);
      setPendingDraw(options);
      setPendingDrawCategory(node.category);
      return;
    }

    if (updatedPlayer.pendingEffects.swap > 0) {
      setPostEffectState(nextState);
      setPendingSwap(updatedPlayer.pendingEffects.swap);
      return;
    }

    advanceTurn(nextState);
  }

  function handleReserveNode(node: Node) {
    if (isDiscarding) {
      openAlert(
        "Discard required",
        `Discard ${discardCount} energy before taking another action.`,
      );
      return;
    }
    if (gameState.energyPool.flux <= 0) {
      openAlert("No Flux available", "Flux is required to reserve a node.");
      return;
    }
    if (currentPlayer.reservedNodes.length >= 3) {
      openAlert("Reserve limit", "Maximum 3 reserved nodes.");
      return;
    }

    const alreadyReserved = currentPlayer.reservedNodes.some(
      (reserved) => reserved.id === node.id,
    );
    if (alreadyReserved) {
      openAlert("Already reserved", "This node is already reserved.");
      return;
    }

    const reservedByOthers = gameState.players.some((player) =>
      player.reservedNodes.some((reserved) => reserved.id === node.id),
    );
    if (reservedByOthers) {
      openAlert("Unavailable", "This node is reserved by another player.");
      return;
    }

    const nextState = applyNodeReservation(
      gameState,
      currentPlayer,
      node,
      true,
    );
    setIsNodeModalOpen(false);
    setSelectedNode(null);
    play("secondary_click");
    advanceTurn(nextState);
  }

  function handleProtocolClaim(protocol: Protocol) {
    if (isDiscarding) {
      openAlert(
        "Discard required",
        `Discard ${discardCount} energy before taking another action.`,
      );
      return;
    }
    const nextState = applyProtocolClaim(gameState, currentPlayer, protocol);
    play("success_sparkle");
    advanceTurn(nextState);
  }

  function handleCloseNodeModal() {
    setIsNodeModalOpen(false);
    setSelectedNode(null);
  }

  function handleDiscardToggle(type: EnergyType) {
    setDiscardSelection((prev) => {
      const index = prev.indexOf(type);
      if (index !== -1) {
        const next = [...prev];
        next.splice(index, 1);
        return next;
      }
      const selectedCount = prev.filter((item) => item === type).length;
      if (selectedCount >= currentPlayer.energy[type]) {
        return prev;
      }
      if (prev.length >= discardCount) {
        return prev;
      }
      return [...prev, type];
    });
  }

  function handleDiscardConfirm() {
    if (discardSelection.length !== discardCount) {
      return;
    }
    const nextState = applyEnergyDiscard(
      gameState,
      currentPlayer,
      discardSelection,
    );
    setIsDiscarding(false);
    setDiscardSelection([]);
    setDiscardCount(0);
    play("primary_click");
    advanceTurn(nextState);
  }

  const handleDrawSelect = useCallback(
    (node: Node) => {
      if (!postEffectState || !pendingDrawCategory) {
        return;
      }
      const nextState = applyDrawEffect(
        postEffectState,
        postEffectState.players[postEffectState.currentPlayerIndex],
        pendingDrawCategory,
        node,
      );
      setPendingDraw(null);
      setPendingDrawCategory(null);
      setPostEffectState(nextState);
      const updatedPlayer = nextState.players[nextState.currentPlayerIndex];
      if (updatedPlayer.pendingEffects.swap > 0) {
        setPendingSwap(updatedPlayer.pendingEffects.swap);
        return;
      }
      advanceTurn(nextState);
      setPostEffectState(null);
      play("secondary_click");
    },
    [advanceTurn, pendingDrawCategory, play, postEffectState],
  );

  const handleDrawSkip = useCallback(() => {
    if (!postEffectState) {
      return;
    }
    const updatedPlayer =
      postEffectState.players[postEffectState.currentPlayerIndex];
    const nextState = {
      ...postEffectState,
      players: postEffectState.players.map((player, index) => {
        if (index !== postEffectState.currentPlayerIndex) {
          return player;
        }
        return {
          ...player,
          pendingEffects: { ...player.pendingEffects, draw: 0 },
        };
      }),
    };
    setPendingDraw(null);
    setPendingDrawCategory(null);
    setPostEffectState(nextState);
    if (updatedPlayer.pendingEffects.swap > 0) {
      setPendingSwap(updatedPlayer.pendingEffects.swap);
      return;
    }
    advanceTurn(nextState);
    setPostEffectState(null);
    play("secondary_click");
  }, [advanceTurn, play, postEffectState]);

  const handleSwapConfirm = useCallback(
    (give: EnergyType[], take: EnergyType[]) => {
      if (!postEffectState) {
        return;
      }
      const nextState = applySwapEffect(
        postEffectState,
        postEffectState.players[postEffectState.currentPlayerIndex],
        give,
        take,
      );
      setPendingSwap(0);
      setPostEffectState(null);
      play("primary_click");
      advanceTurn(nextState);
    },
    [advanceTurn, play, postEffectState],
  );

  const handleSwapSkip = useCallback(() => {
    if (!postEffectState) {
      return;
    }
    const nextState = {
      ...postEffectState,
      players: postEffectState.players.map((player, index) => {
        if (index !== postEffectState.currentPlayerIndex) {
          return player;
        }
        return {
          ...player,
          pendingEffects: { ...player.pendingEffects, swap: 0 },
        };
      }),
    };
    setPendingSwap(0);
    setPostEffectState(null);
    play("secondary_click");
    advanceTurn(nextState);
  }, [advanceTurn, play, postEffectState]);

  useEffect(() => {
    const drawOpen = Boolean(pendingDraw && pendingDraw.length > 0);
    const swapOpen = Boolean(pendingSwap > 0 && postEffectState);
    const prev = modalStateRef.current;
    if (prev.node !== isNodeModalOpen) {
      play("modal_whoosh");
      prev.node = isNodeModalOpen;
    }
    if (prev.exchange !== isExchangeOpen) {
      play("modal_whoosh");
      prev.exchange = isExchangeOpen;
    }
    if (prev.draw !== drawOpen) {
      play("modal_whoosh");
      prev.draw = drawOpen;
    }
    if (prev.swap !== swapOpen) {
      play("modal_whoosh");
      prev.swap = swapOpen;
    }
  }, [isExchangeOpen, isNodeModalOpen, pendingDraw, pendingSwap, play, postEffectState]);

  const marketRows = useMemo(() => {
    const categories = ["Research", "Production", "Network", "Control"];
    return categories.map((label, index) => ({
      label,
      nodes: gameState.marketNodes[index] || [],
    }));
  }, [gameState.marketNodes]);

  const marketSectionNodes = marketRows.map((row) => {
    const nodes = row.nodes.map((node) => {
      if (!node) {
        return null;
      }
      const handlePress = () => handleNodePress(node);
      return (
        <View
          key={node.id}
          style={{ paddingBottom: 11.5 }}
          pointerEvents={isPlayerTurn ? "auto" : "none"}
        >
          <NodeCard
            node={node}
            onPress={isPlayerTurn ? handlePress : undefined}
            showTitle={false}
            isAffordable={
              isPlayerTurn ? canAffordNode(node, currentPlayer) : false
            }
          />
        </View>
      );
    });

    return (
      <View key={row.label} style={gameBoardStyles.section}>
        <Text style={gameBoardStyles.sectionLabel}>{row.label} Nodes</Text>
        <View style={gameBoardStyles.sectionRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={gameBoardStyles.row}
          >
            {nodes}
          </ScrollView>
        </View>
      </View>
    );
  });

  const protocolCards = gameState.protocols.map((protocol) => {
    const handlePress = () => handleProtocolClaim(protocol);
    return (
      <View key={protocol.id} pointerEvents={isPlayerTurn ? "auto" : "none"}>
        <ProtocolCard
          protocol={protocol}
          player={currentPlayer}
          onPress={isPlayerTurn ? handlePress : undefined}
        />
      </View>
    );
  });

  const playerAreas = gameState.players.map((player, index) => {
    const isCurrent = index === gameState.currentPlayerIndex;
    return (
      <PlayerArea
        key={player.id}
        player={player}
        isCurrentPlayer={isCurrent}
        onReservedNodePress={
          isCurrent && isPlayerTurn ? handleReservedNodePress : undefined
        }
        disabled={!isPlayerTurn}
      />
    );
  });

  return (
    <View style={gameBoardStyles.container}>
      {selectedTab === "market" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gameBoardStyles.scrollContent}
        >
          <EnergyPool
            energyPool={gameState.energyPool}
            selectedEnergy={selectedEnergy}
            onToggleEnergy={handleEnergyToggle}
            onCollect={handleCollectEnergy}
            onExchange={handleOpenExchange}
            disabled={!isPlayerTurn}
          />
          {marketSectionNodes}
        </ScrollView>
      ) : null}

      {selectedTab === "protocols" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gameBoardStyles.scrollContent}
        >
          {protocolCards}
        </ScrollView>
      ) : null}

      {selectedTab === "players" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={gameBoardStyles.scrollContent}
        >
          {playerAreas}
        </ScrollView>
      ) : null}

      {selectedNode ? (
        <NodeDetailModal
          node={selectedNode}
          player={currentPlayer}
          isOpen={isNodeModalOpen}
          onClose={handleCloseNodeModal}
          onBuild={handleBuildNode}
          onReserve={handleReserveNode}
        />
      ) : null}

      <EnergyDiscardModal
        isOpen={isDiscarding}
        discardCount={discardCount}
        selection={discardSelection}
        playerEnergy={currentPlayer.energy}
        onToggleEnergy={handleDiscardToggle}
        onConfirm={handleDiscardConfirm}
      />
      <ExchangeModal
        isOpen={isExchangeOpen}
        mode={exchangeMode}
        takeType={exchangeTakeType}
        giveSelection={exchangeGiveSelection}
        playerEnergy={currentPlayer.energy}
        poolEnergy={gameState.energyPool}
        onModeChange={handleExchangeModeChange}
        onSelectTakeType={handleExchangeTakeType}
        onToggleGive={handleExchangeGiveToggle}
        onConfirm={handleConfirmExchange}
        onClose={handleCloseExchange}
      />
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={handleCloseAlert}
      />
      {pendingDraw ? (
        <DrawModal
          isOpen={pendingDraw.length > 0}
          options={pendingDraw}
          onSelect={handleDrawSelect}
          onSkip={handleDrawSkip}
        />
      ) : null}
      {pendingSwap > 0 && postEffectState ? (
        <SwapModal
          isOpen
          maxSwaps={pendingSwap}
          playerEnergy={
            postEffectState.players[postEffectState.currentPlayerIndex].energy
          }
          poolEnergy={postEffectState.energyPool}
          onConfirm={handleSwapConfirm}
          onSkip={handleSwapSkip}
        />
      ) : null}
    </View>
  );
}
