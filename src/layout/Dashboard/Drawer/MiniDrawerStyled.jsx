import Drawer from '@mui/material/Drawer';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { DRAWER_WIDTH, HEADER_HEIGHT } from 'config';

const openedMixin = (theme) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    width: DRAWER_WIDTH,
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    }),
    overflowX: 'hidden',
    boxShadow: isDark ? '4px 0 10px rgba(0,0,0,0.15)' : '2px 0 8px rgba(0,0,0,0.05)',
    background: isDark
      ? `linear-gradient(${alpha(theme.palette.background.paper, 0.96)}, ${alpha(theme.palette.background.paper, 0.98)})`
      : `linear-gradient(${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 1)})`,
    backdropFilter: 'blur(8px)',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
      opacity: 0.05,
      backgroundImage: isDark
        ? 'radial-gradient(circle at 100% 150%, rgba(120, 120, 165, 0.1) 5%, rgba(120, 120, 165, 0.05) 15%, transparent 60%), radial-gradient(circle at 0% 50%, rgba(120, 120, 165, 0.15) 0%, transparent 40%)'
        : 'radial-gradient(circle at 100% 150%, rgba(234, 228, 252, 0.5) 5%, rgba(234, 228, 252, 0.2) 15%, transparent 60%), radial-gradient(circle at 0% 50%, rgba(234, 228, 252, 0.4) 0%, transparent 40%)'
    },
    [theme.breakpoints.down('lg')]: {
      top: HEADER_HEIGHT,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`
    }
  };
};

const closedMixin = (theme) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    }),
    overflowX: 'hidden',
    width: theme.spacing(7.5),
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    boxShadow: isDark ? '2px 0 8px rgba(0,0,0,0.12)' : '1px 0 5px rgba(0,0,0,0.03)',
    background: isDark
      ? `linear-gradient(${alpha(theme.palette.background.paper, 0.96)}, ${alpha(theme.palette.background.paper, 0.98)})`
      : `linear-gradient(${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 1)})`,
    backdropFilter: 'blur(8px)',
    [theme.breakpoints.down('lg')]: {
      width: 0,
      top: HEADER_HEIGHT,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`
    }
  };
};

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(['width', 'box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard
  }),
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  }),
  [theme.breakpoints.down('lg')]: {
    position: 'fixed'
  }
}));

export default MiniDrawerStyled;
