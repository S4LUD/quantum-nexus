import { Player, EnergyType } from "@/types";

export function calculatePlayerOutputs(
  player: Player,
): Record<Exclude<EnergyType, "flux">, number> {
  const outputs: Record<Exclude<EnergyType, "flux">, number> = {
    solar: 0,
    hydro: 0,
    plasma: 0,
    neural: 0,
  };

  const reservedIds = new Set(player.reservedNodes.map((node) => node.id));
  player.nodes.forEach((node) => {
    if (reservedIds.has(node.id)) {
      return;
    }
    outputs[node.outputType] += 1;
  });

  const pendingMultipliers = player.pendingEffects?.multiplier || {};
  (Object.entries(pendingMultipliers) as [
    Exclude<EnergyType, "flux">,
    number,
  ][]).forEach(([energyType, value]) => {
    if (value > 0) {
      outputs[energyType] += value;
    }
  });

  return outputs;
}

export function getTotalEnergy(player: Player): number {
  return Object.values(player.energy).reduce((sum, count) => sum + count, 0);
}
