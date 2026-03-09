import { brandTokens } from "./tokens";

export const antdTheme = {
  token: {
    ...brandTokens
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 46,
      fontWeight: 600
    },
    Card: {
      borderRadiusLG: 14
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40
    }
  }
};
