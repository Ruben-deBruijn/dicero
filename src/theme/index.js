import { createMuiTheme } from '@material-ui/core/styles';

// Colors
import { colorsDefault } from './colors';

export const THEMES = {
  defaultTheme: 'defaultTheme',
};

const colorsMap = {
  [THEMES.defaultTheme]: colorsDefault,
};

export const createTheme = name => createMuiTheme({
  palette: {
      ...colorsMap[name],
  },
  overrides:{
    MuiAccordion: {
      rounded: {
        borderRadius: 4,
        marginBottom: 8,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'unset',
      },
    },
    MuiStepper: {
      root: {
        padding: 0,
        background: 'transparent',
      },
    },
    MuiStep: {
      horizontal: {
        padding: 0,
        color: '#1984A4',
      },
      completed: {
        color: '#00983c',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#1984A4',
      },
    },
    MuiDialog: {
      paper: {
        padding: 16,
      },
      paperFullWidth: {
        width: 'calc(100% - 32px)'
      }
    },
    MuiDialogContent: {
      root: {
        padding: 0,
        '&:first-child': {
          paddingTop: 0,
        },
      },
    },
  },

  scrollbar: {
    '&::-webkit-scrollbar': {
      width: 10,
      background: 'rgba(0, 0, 0, 0.12) !important',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(43, 64, 64, 0.21) !important',
      borderRadius: 2,
    },
  },
  border: (color, width = 1, style = 'solid') => `${width}px ${style} ${color}`,
});
