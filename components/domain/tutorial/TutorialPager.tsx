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
import { createTutorialPagerStyles } from "./tutorialPager.styles";
import { layout } from "@/constants/layout";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

interface TutorialPagerProps {
  onDone: () => void;
}

export function TutorialPager({ onDone }: TutorialPagerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const tutorialPagerStyles = useMemo(
    () => createTutorialPagerStyles(theme),
    [theme],
  );

  const pages = useMemo(
    () => [
      {
        title: t("tutorial.welcomeTitle"),
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              {t("tutorial.welcomeBody1")}
            </Text>
            <Text style={tutorialPagerStyles.bodyText}>
              {t("tutorial.welcomeBody2")}
            </Text>
            <View style={tutorialPagerStyles.callout}>
              <Text style={tutorialPagerStyles.calloutTitle}>
                {t("tutorial.winConditions")}
              </Text>
              <View style={tutorialPagerStyles.list}>
                <View style={tutorialPagerStyles.listRow}>
                  <Text style={tutorialPagerStyles.listInlineText}>
                    {t("tutorial.winConditionEfficiency").split("★")[0]}
                  </Text>
                  <Icon
                    icon={Star}
                    size={layout.icon.sm}
                    color={colors.yellow400}
                    style={tutorialPagerStyles.listIcon}
                    fill="none"
                  />
                  <Text style={tutorialPagerStyles.listInlineText}>
                    {t("tutorial.winConditionEfficiency").split("★")[1]}
                  </Text>
                </View>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.winConditionNodes")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.winConditionProtocols")}
                </Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        title: t("tutorial.energyTypesTitle"),
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              {t("tutorial.energyTypesBody")}
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
                  <Text style={tutorialPagerStyles.energyTitle}>
                    {t("energy.solar")}
                  </Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    {t("energy.solarSubtitle")}
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
                  <Text style={tutorialPagerStyles.energyTitle}>
                    {t("energy.hydro")}
                  </Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    {t("energy.hydroSubtitle")}
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
                  <Text style={tutorialPagerStyles.energyTitle}>
                    {t("energy.plasma")}
                  </Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    {t("energy.plasmaSubtitle")}
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
                  <Text style={tutorialPagerStyles.energyTitle}>
                    {t("energy.neural")}
                  </Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    {t("energy.neuralSubtitle")}
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
                  <Text style={tutorialPagerStyles.energyTitle}>
                    {t("energy.flux")}
                  </Text>
                  <Text style={tutorialPagerStyles.energySubtitle}>
                    {t("energy.fluxSubtitle")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ),
      },
      {
        title: t("tutorial.yourTurnTitle"),
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              {t("tutorial.yourTurnBody")}
            </Text>
            <View style={tutorialPagerStyles.cardList}>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.collectTitle")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.collectLine1")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.collectLine2")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.collectLine3")}
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.buildTitle")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.buildLine1")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.buildLine2")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.buildLine3")}
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.reserveTitle")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.reserveLine1")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.reserveLine2")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.reserveLine3")}
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.exchangeTitle")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.exchangeLine1")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.exchangeLine2")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.exchangeLine3")}
                </Text>
                <Text style={tutorialPagerStyles.listItem}>
                  {t("tutorial.exchangeLine4")}
                </Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        title: t("tutorial.nodesTitle"),
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              {t("tutorial.nodesBody")}
            </Text>
            <View style={tutorialPagerStyles.nodeList}>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeResearch,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  {t("tutorial.nodeResearch")}
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  {t("tutorial.nodeResearchDesc")}
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeProduction,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  {t("tutorial.nodeProduction")}
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  {t("tutorial.nodeProductionDesc")}
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeNetwork,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  {t("tutorial.nodeNetwork")}
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  {t("tutorial.nodeNetworkDesc")}
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.nodeRow,
                  tutorialPagerStyles.nodeControl,
                ]}
              >
                <Text style={tutorialPagerStyles.energyTitle}>
                  {t("tutorial.nodeControl")}
                </Text>
                <Text style={tutorialPagerStyles.energySubtitle}>
                  {t("tutorial.nodeControlDesc")}
                </Text>
              </View>
            </View>
            <View style={tutorialPagerStyles.callout}>
              <Text style={tutorialPagerStyles.calloutTitle}>
                {t("tutorial.outputTitle")}
              </Text>
              <Text style={tutorialPagerStyles.bodyText}>
                {t("tutorial.outputBody")}
              </Text>
            </View>
          </View>
        ),
      },
      {
        title: t("tutorial.protocolsTitle"),
        content: (
          <View style={tutorialPagerStyles.section}>
            <Text style={tutorialPagerStyles.bodyText}>
              {t("tutorial.protocolsBody")}
            </Text>
            <View style={tutorialPagerStyles.protocolList}>
              <View
                style={[
                  tutorialPagerStyles.protocolCard,
                  tutorialPagerStyles.protocolRequirements,
                ]}
              >
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.protocolRequirements")}
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  {t("tutorial.protocolRequirementsLine1")}
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  {t("tutorial.protocolRequirementsLine2")}
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.protocolCard,
                  tutorialPagerStyles.protocolClaiming,
                ]}
              >
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.protocolClaiming")}
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  {t("tutorial.protocolClaimingLine1")}
                </Text>
              </View>
              <View
                style={[
                  tutorialPagerStyles.protocolCard,
                  tutorialPagerStyles.protocolBenefits,
                ]}
              >
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.protocolBenefits")}
                </Text>
                <Text style={tutorialPagerStyles.bodyText}>
                  {t("tutorial.protocolBenefitsLine1")}
                </Text>
              </View>
            </View>
            <View style={tutorialPagerStyles.callout}>
              <Text style={tutorialPagerStyles.bodyText}>
                {t("tutorial.protocolExamples")}
              </Text>
            </View>
          </View>
        ),
      },
      {
        title: t("tutorial.strategyTitle"),
        content: (
          <View style={tutorialPagerStyles.section}>
            <View style={tutorialPagerStyles.cardList}>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.strategyMultipleTitle")}
                </Text>
                <Text style={tutorialPagerStyles.bodyMuted}>
                  {t("tutorial.strategyMultipleBody")}
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.strategyFluxTitle")}
                </Text>
                <Text style={tutorialPagerStyles.bodyMuted}>
                  {t("tutorial.strategyFluxBody")}
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.strategyEffectsTitle")}
                </Text>
                <Text style={tutorialPagerStyles.bodyMuted}>
                  {t("tutorial.strategyEffectsBody")}
                </Text>
              </View>
              <View style={tutorialPagerStyles.card}>
                <Text style={tutorialPagerStyles.cardTitle}>
                  {t("tutorial.strategyTimingTitle")}
                </Text>
                <Text style={tutorialPagerStyles.bodyMuted}>
                  {t("tutorial.strategyTimingBody")}
                </Text>
              </View>
            </View>
          </View>
        ),
      },
    ],
    [t, tutorialPagerStyles],
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
          <Icon icon={X} size={layout.icon.md} color={theme.colors.text} />
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
          <Icon
            icon={ChevronLeft}
            size={layout.icon.md}
            color={theme.colors.text}
          />
          <Text style={tutorialPagerStyles.footerLabel}>
            {t("tutorial.previous")}
          </Text>
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
            <Text style={tutorialPagerStyles.footerLabel}>
              {t("tutorial.next")}
            </Text>
            <Icon
              icon={ChevronRight}
              size={layout.icon.md}
              color={theme.colors.text}
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
            <Text style={tutorialPagerStyles.footerLabelOnPrimary}>
              {t("tutorial.gotIt")}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
