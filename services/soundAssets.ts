export const SOUND_FILES = {
  primary_click: require("@/assets/sound_effects/gameplay_actions/primary_click.mp3"),
  secondary_click: require("@/assets/sound_effects/gameplay_actions/secondary_click.mp3"),
  error_pop: require("@/assets/sound_effects/gameplay_actions/error_pop.mp3"),
  success_sparkle: require("@/assets/sound_effects/gameplay_actions/success_sparkle.mp3"),
  modal_whoosh: require("@/assets/sound_effects/ui_and_modals/whoosh.wav"),
  victory: require("@/assets/sound_effects/endgame/magical_sparkle_whoosh.mp3"),
} as const;

export type SoundKey = keyof typeof SOUND_FILES;
