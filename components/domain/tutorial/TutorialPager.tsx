import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Droplet,
  Flame,
  Brain,
  Sparkles,
  Star,
} from "lucide-react-native";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";
import { colors } from "@/constants/colors";
import { tutorialPagerStyles } from "./tutorialPager.styles";
import { layout } from "@/constants/layout";

interface TutorialPagerProps {
  onDone: () => void;
}

export function TutorialPager({ onDone }: TutorialPagerProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = useMemo(
    () => [
      {
        title: "Welcome to Quantum Nexus",
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              Build a quantum computing network by collecting energy and
              constructing nodes.
            </Text>
            <Text style={tutorialPagerStyles.bodyText}>
              Be the first to achieve victory through efficiency, network size,
              or protocol mastery.
            </Text>
            <View style={tutorialPagerStyles.callout}>
              <Text style={tutorialPagerStyles.calloutTitle}>
                Win Conditions
              </Text>
              <View style={tutorialPagerStyles.list}>
                <View style={tutorialPagerStyles.listRow}>
                  <Text style={tutorialPagerStyles.listInlineText}>
                    • Reach 20
                  </Text>
                  <Icon
                    icon={Star}
                    size={layout.icon.sm}
                    color={colors.yellow400}
                    style={tutorialPagerStyles.listIcon}
                  />
                  <Text style={tutorialPagerStyles.listInlineText}>
                    Efficiency after turn 20
                  </Text>
                </View>
                <Text style={tutorialPagerStyles.listItem}>
                  • Build 12 or more Nodes
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Claim 3 or more Protocols
                </Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        title: "Energy Types",
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              There are 4 energy types plus Flux:
            </Text>
            <View style={tutorialPagerStyles.energyList}>
              <View
                style={[
                  tutorialPagerStyles.energyRow,
                  tutorialPagerStyles.energySolar,
                ]}
              >
                <Icon
                  icon={Zap}
                  size={layout.icon.lg}
                  color={colors.yellow400}
                  fill="none"
                />
                <View>
                  <Text style={tutorialPagerStyles.energyTitle}>Solar</Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    Yellow/Orange energy
                  </Text>
                </View>
              </View>
              <View
                style={[
                  tutorialPagerStyles.energyRow,
                  tutorialPagerStyles.energyHydro,
                ]}
              >
                <Icon
                  icon={Droplet}
                  size={layout.icon.lg}
                  color={colors.cyan400}
                  fill="none"
                />
                <View>
                  <Text style={tutorialPagerStyles.energyTitle}>Hydro</Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    Cyan/Blue energy
                  </Text>
                </View>
              </View>
              <View
                style={[
                  tutorialPagerStyles.energyRow,
                  tutorialPagerStyles.energyPlasma,
                ]}
              >
                <Icon
                  icon={Flame}
                  size={layout.icon.lg}
                  color={colors.pink400}
                  fill="none"
                />
                <View>
                  <Text style={tutorialPagerStyles.energyTitle}>Plasma</Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    Pink/Magenta energy
                  </Text>
                </View>
              </View>
              <View
                style={[
                  tutorialPagerStyles.energyRow,
                  tutorialPagerStyles.energyNeural,
                ]}
              >
                <Icon
                  icon={Brain}
                  size={layout.icon.lg}
                  color={colors.green400}
                  fill="none"
                />
                <View>
                  <Text style={tutorialPagerStyles.energyTitle}>Neural</Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    Green energy
                  </Text>
                </View>
              </View>
              <View
                style={[
                  tutorialPagerStyles.energyRow,
                  tutorialPagerStyles.energyFlux,
                ]}
              >
                <Icon
                  icon={Sparkles}
                  size={layout.icon.lg}
                  color={colors.purple400}
                  fill="none"
                />
                <View>
                  <Text style={tutorialPagerStyles.energyTitle}>Flux</Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    Wild energy (gained by reserving only)
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ),
      },
      {
        title: "Your Turn",
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              On your turn, choose ONE action:
            </Text>
            <View style={tutorialPagerStyles.cardList}>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  1. Collect Energy
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Take 3 different energy types, OR
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Take 2 of the same type (if 4+ available)
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Maximum 10 energy total
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  2. Build a Node
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Pay the energy cost
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Add to your network
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Gain efficiency points
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  3. Reserve a Node
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Set aside for later (max 3)
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Gain 1 Flux energy (if available)
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Build from reserves anytime
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  4. Exchange Energy
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • 1:1 exchange (give 1, take 1)
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • 2:3 exchange (take 2 same, give any 3)
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Flux cannot be exchanged
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  • Pool must have energy to take
                </Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        title: "Nodes",
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              Nodes are the core of your network. Each provides:
            </Text>
            <View style={tutorialPagerStyles.nodeList}>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeResearch,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  Research Nodes
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  Special abilities and efficiency boosts
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeProduction,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  Production Nodes
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  High efficiency, greater costs
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeNetwork,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  Network Nodes
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  Complex, high-value additions
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeControl,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  Control Nodes
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  Utility effects and flexibility
                </Text>
              </View>
            </View>
            <View style={tutorialPagerStyles.callout}>
              <Text style={tutorialPagerStyles.calloutTitle}>
                Output Generation
              </Text>
              <Text style={tutorialPagerStyles.bodyText}>
                Each node generates 1 output of its type, which counts toward
                Protocol requirements and reduces that energy cost by 1 when
                building nodes (base energies only).
              </Text>
            </View>
          </View>
        ),
      },
      {
        title: "Protocols",
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              Protocols are powerful upgrades you can claim:
            </Text>
            <View style={tutorialPagerStyles.protocolList}>
              <View
                style={[
                  tutorialPagerStyles.protocolCard,
                  tutorialPagerStyles.protocolRequirements,
                ]}
              >
                <Text style={tutorialPagerStyles.cardTitle}>Requirements</Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Must have enough OUTPUT generation (not energy held)
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Outputs are not spent and can qualify for multiple Protocols
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.protocolCard,
                  tutorialPagerStyles.protocolClaiming,
                ]}
              >
                <Text style={tutorialPagerStyles.cardTitle}>Claiming</Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Must actively tap to claim (not automatic)
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.protocolCard,
                  tutorialPagerStyles.protocolBenefits,
                ]}
              >
                <Text style={tutorialPagerStyles.cardTitle}>Benefits</Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Provides efficiency points + ongoing special effects
                </Text>
              </View>
            </View>
            <View style={tutorialPagerStyles.callout}>
              <Text style={tutorialPagerStyles.bodyText}>
                Examples: Double output generation, free reserves, energy swaps,
                cost reductions
              </Text>
            </View>
          </View>
        ),
      },
      {
        title: "Strategy Tips",
        content: (
          <View style={tutorialPagerStyles.section}>
            <View style={tutorialPagerStyles.cardList}>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.bodyStrong}>
                  Multiple Paths to Victory
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Focus on efficiency, network size, or protocol mastery - or
                  mix strategies.
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.bodyStrong}>
                  Flux is Powerful
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Use as wild energy, but limited supply. Reserve to gain Flux.
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.bodyStrong}>
                  Node Effects Stack
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Effects are temporary and trigger after building nodes.
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.bodyStrong}>
                  Timing Matters
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  Efficiency threshold only triggers after turn 20 - plan
                  accordingly.
                </Text>
              </View>
            </View>
          </View>
        ),
      },
    ],
    [],
  );

  const current = pages[currentPage];

  const nextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      onDone();
    }
  }, [currentPage, onDone, pages.length]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const handleClose = useCallback(() => {
    onDone();
  }, [onDone]);

  return (
    <View style={tutorialPagerStyles.wrapper}>
      <View style={tutorialPagerStyles.header}>
        <Text style={tutorialPagerStyles.headerTitle}>{current.title}</Text>
        <Pressable
          onPress={handleClose}
          style={tutorialPagerStyles.closeButton}
        >
          <Icon icon={X} size={layout.icon.md} color={colors.white} />
        </Pressable>
      </View>

      <View style={tutorialPagerStyles.scrollContainer}>
        <ScrollView
          style={tutorialPagerStyles.scroll}
          contentContainerStyle={tutorialPagerStyles.scrollContent}
        >
          {current.content}
        </ScrollView>
      </View>

      <View style={tutorialPagerStyles.footer}>
        <Pressable
          onPress={prevPage}
          disabled={currentPage === 0}
          style={[
            tutorialPagerStyles.footerButtonBase,
            tutorialPagerStyles.footerButton,
            currentPage === 0 ? tutorialPagerStyles.footerButtonDisabled : null,
          ]}
        >
          <Icon icon={ChevronLeft} size={layout.icon.md} color={colors.white} />
          <Text style={tutorialPagerStyles.footerLabel}>Previous</Text>
        </Pressable>

        <View style={tutorialPagerStyles.dots}>
          {pages.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                tutorialPagerStyles.dot,
                index === currentPage ? tutorialPagerStyles.dotActive : null,
              ]}
            />
          ))}
        </View>

        {currentPage < pages.length - 1 ? (
          <Pressable
            onPress={nextPage}
            style={[
              tutorialPagerStyles.footerButtonBase,
              tutorialPagerStyles.footerButtonPrimary,
            ]}
          >
            <Text style={tutorialPagerStyles.footerLabel}>Next</Text>
            <Icon
              icon={ChevronRight}
              size={layout.icon.md}
              color={colors.white}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleClose}
            style={[
              tutorialPagerStyles.footerButtonBase,
              tutorialPagerStyles.footerButtonSuccess,
            ]}
          >
            <Text style={tutorialPagerStyles.footerLabel}>Got it</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
