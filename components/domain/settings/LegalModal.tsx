import { useCallback, useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { layout } from "@/constants/layout";
import { useTheme } from "@/hooks/useTheme";
import { createLegalModalStyles } from "./legalModal.styles";

export type LegalModalType = "terms" | "privacy";

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

interface LegalSection {
  title: string;
  body: string;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const legalModalStyles = useMemo(() => createLegalModalStyles(theme), [theme]);

  const isTerms = type === "terms";
  const title = isTerms ? t("legal.terms.title") : t("legal.privacy.title");
  const updated = isTerms
    ? t("legal.terms.updated")
    : t("legal.privacy.updated");
  const intro = isTerms ? t("legal.terms.intro") : t("legal.privacy.intro");
  const languageNotice = t("legal.languageNotice");

  const sections = useMemo<LegalSection[]>(
    () =>
      isTerms
        ? [
            {
              title: t("legal.terms.sections.licenseTitle"),
              body: t("legal.terms.sections.licenseBody"),
            },
            {
              title: t("legal.terms.sections.acceptableTitle"),
              body: t("legal.terms.sections.acceptableBody"),
            },
            {
              title: t("legal.terms.sections.contentTitle"),
              body: t("legal.terms.sections.contentBody"),
            },
            {
              title: t("legal.terms.sections.liabilityTitle"),
              body: t("legal.terms.sections.liabilityBody"),
            },
            {
              title: t("legal.terms.sections.changesTitle"),
              body: t("legal.terms.sections.changesBody"),
            },
          ]
        : [
            {
              title: t("legal.privacy.sections.dataTitle"),
              body: t("legal.privacy.sections.dataBody"),
            },
            {
              title: t("legal.privacy.sections.permissionsTitle"),
              body: t("legal.privacy.sections.permissionsBody"),
            },
            {
              title: t("legal.privacy.sections.storageTitle"),
              body: t("legal.privacy.sections.storageBody"),
            },
            {
              title: t("legal.privacy.sections.childrenTitle"),
              body: t("legal.privacy.sections.childrenBody"),
            },
            {
              title: t("legal.privacy.sections.changesTitle"),
              body: t("legal.privacy.sections.changesBody"),
            },
          ],
    [isTerms, t],
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const renderSection = useCallback(
    (section: LegalSection) => (
      <View key={section.title} style={legalModalStyles.section}>
        <Text style={legalModalStyles.sectionTitle}>{section.title}</Text>
        <Text style={legalModalStyles.sectionBody}>{section.body}</Text>
      </View>
    ),
    [legalModalStyles],
  );

  return (
    <View style={legalModalStyles.wrapper}>
      <View style={legalModalStyles.header}>
        <View>
          <Text style={legalModalStyles.title}>{title}</Text>
          <Text style={legalModalStyles.updated}>{updated}</Text>
          <Text style={legalModalStyles.notice}>{languageNotice}</Text>
        </View>
        <Pressable onPress={handleClose} style={legalModalStyles.closeButton}>
          <Icon icon={X} size={layout.icon.lg} color={theme.colors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={legalModalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={legalModalStyles.intro}>{intro}</Text>
        {sections.map(renderSection)}
      </ScrollView>

      <View style={legalModalStyles.footer}>
        <Button label={t("common.close")} onPress={handleClose} />
      </View>
    </View>
  );
}
