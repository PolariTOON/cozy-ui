import { alpha, lighten, darken } from '@material-ui/core/styles'

const SWITCH_BAR_WIDTH = 25

export const makeThemeOverrides = theme => {
  const createOverrides =
    theme.palette.type === 'dark' ? makeInvertedOverrides : makeOverrides

  return createOverrides(theme)
}

const makeAlertColor = (theme, color) => {
  const themeColorByColor = {
    primary: theme.palette[color].main,
    secondary: theme.palette.text.primary
  }

  // same approach as Mui, see https://github.com/mui/material-ui/blob/v4.x/packages/material-ui-lab/src/Alert/Alert.js#L28
  return {
    '&-standard': {
      color: darken(themeColorByColor[color], 0.6),
      backgroundColor: lighten(themeColorByColor[color], 0.9),
      '& $icon': {
        color: themeColorByColor[color]
      },
      '& $action': {
        '& button[title="Close"]': {
          color: theme.palette.text.secondary
        }
      }
    },
    '&-outlined': {
      color: darken(themeColorByColor[color], 0.6),
      border: `1px solid ${themeColorByColor[color]}`,
      '& $icon': {
        color: themeColorByColor[color]
      }
    },
    '&-filled': {
      backgroundColor:
        color === 'secondary'
          ? theme.palette.grey[600]
          : themeColorByColor[color]
    }
  }
}

const makeAlertInvertedColor = (theme, color) => {
  return {
    '&-standard': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
      '& $icon': {
        color: theme.palette[color].main
      }
    },
    '&-outlined': {
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      '& $icon': {
        color: theme.palette[color].main
      }
    },
    '&-filled': {
      color: theme.palette[color].contrastText,
      backgroundColor:
        color === 'secondary'
          ? theme.palette.grey[200]
          : theme.palette[color].main,
      '& $icon': {
        color: theme.palette[color].contrastText
      }
    }
  }
}

const makeChipStyleByColor = (theme, color) => ({
  color: theme.palette.text[color] || theme.palette[color].main,
  borderColor:
    color === 'primary'
      ? theme.palette.border.main
      : alpha(theme.palette[color].main, theme.palette.border.opacity),
  '&$clickable, &$deletable': {
    '&:hover, &:focus': {
      borderColor:
        color === 'primary'
          ? theme.palette.border.main
          : alpha(theme.palette[color].main, theme.palette.border.opacity),
      backgroundColor:
        color === 'primary'
          ? theme.palette.action.hover
          : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
    }
  },
  '& $icon': {
    color:
      color === 'primary' ? theme.palette.text.icon : theme.palette[color].main,
    fill:
      color === 'primary' ? theme.palette.text.icon : theme.palette[color].main
  },
  '& $deleteIcon': {
    color:
      color === 'primary'
        ? theme.palette.text.secondary
        : theme.palette[color].main,
    fill:
      color === 'primary'
        ? theme.palette.text.secondary
        : theme.palette[color].main
  },
  '&$colorPrimary': {
    padding: '0 1px',
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    '& $icon, & $deleteIcon': {
      color: theme.palette[color].contrastText,
      fill: theme.palette[color].contrastText
    },
    '&$disabled': {
      opacity: 1,
      color: theme.palette.text.disabled,
      backgroundColor: theme.palette.action.disabledBackground,
      '& $icon, & $deleteIcon': {
        color: theme.palette.text.disabled,
        fill: theme.palette.text.disabled
      }
    },
    '&$clickable, &$deletable': {
      '&:hover, &:focus': {
        backgroundColor: theme.palette[color].dark
      }
    }
  },
  '&.ghost': {
    borderWidth: '1px',
    borderStyle: 'dashed',
    '&:not($disabled)': {
      color: theme.palette[color].main,
      borderColor: alpha(
        theme.palette[color].main,
        theme.palette.border.ghostOpacity
      ),
      backgroundColor: alpha(
        theme.palette[color].main,
        theme.palette.action.ghostOpacity
      ),
      '& $icon, & $deleteIcon': {
        color: theme.palette[color].main,
        fill: theme.palette[color].main
      }
    },
    '&$clickable, &$deletable': {
      '&:hover, &:focus': {
        borderColor: alpha(
          theme.palette[color].main,
          theme.palette.border.ghostOpacity
        ),
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverGhostOpacity
        )
      }
    }
  }
})

const makeSecondaryButtonStyle = (theme, color) => ({
  color: theme.palette[color].main,
  borderColor: theme.palette[color].main,
  '&:hover': {
    backgroundColor: alpha(
      theme.palette[color].main,
      theme.palette.action.hoverOpacity
    ),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  '&.ghost': {
    backgroundColor: alpha(
      theme.palette[color].main,
      theme.palette.action.ghostOpacity
    ),
    '&:hover': {
      backgroundColor: alpha(
        theme.palette[color].main,
        theme.palette.action.hoverGhostOpacity
      ),
      '@media (hover: none)': {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.ghostOpacity
        )
      }
    }
  }
})

const makeTextButtonStyle = (theme, color) => ({
  color: theme.palette[color].main,
  '&:hover': {
    backgroundColor: alpha(
      theme.palette[color].main,
      theme.palette.action.hoverOpacity
    ),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
})

const makeContainedButtonStyle = (theme, color) => ({
  color: theme.palette[color].contrastText,
  backgroundColor: theme.palette[color].main,
  '&:hover': {
    backgroundColor: theme.palette[color].dark,
    '@media (hover: none)': {
      backgroundColor: theme.palette[color].main
    }
  }
})

const makeOverrides = theme => ({
  MuiOutlinedInput: {
    root: {
      '&$disabled': {
        background: theme.palette.grey[100]
      },
      '&$focused $notchedOutline': {
        borderWidth: '0.0625rem'
      },
      '&:hover $notchedOutline': {
        borderColor: theme.palette.grey[300]
      }
    },
    notchedOutline: {
      borderColor: theme.palette.grey[200]
    }
  },
  MuiButton: {
    root: {
      borderRadius: 2,
      height: '2.5rem',
      padding: '0 1rem',
      '&.ghost': {
        borderStyle: 'dashed !important', // important needed to override disable state
        '&:hover': {
          borderStyle: 'dashed !important' // important needed to override disable state
        }
      }
    },
    sizeSmall: {
      height: '2rem',
      padding: '0 0.75rem',
      '&$text': {
        padding: '8px 6px'
      }
    },
    sizeLarge: {
      height: '3rem',
      padding: '0 1.25rem',
      '&$text': {
        padding: '14px 10px'
      }
    },
    text: {
      minWidth: 'auto',
      padding: '11px 8px',
      '&:not($disabled)': {
        '&.customColor': {
          '&-success': makeTextButtonStyle(theme, 'success'),
          '&-warning': makeTextButtonStyle(theme, 'warning'),
          '&-error': makeTextButtonStyle(theme, 'error'),
          '&-info': makeTextButtonStyle(theme, 'info')
        }
      }
    },
    outlined: {
      '&:not($disabled)': {
        '&.ghost': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.ghostOpacity
          ),
          '&:hover': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.hoverGhostOpacity
            ),
            '@media (hover: none)': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.ghostOpacity
              )
            }
          }
        },
        '&.customColor': {
          '&-primary': {
            color: theme.palette.text.primary,
            borderColor: theme.palette.border.main,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              '@media (hover: none)': {
                backgroundColor: 'transparent'
              }
            },
            '&.ghost': {
              color: theme.palette.primary.main,
              borderColor: alpha(
                theme.palette.primary.main,
                theme.palette.border.ghostOpacity
              )
            }
          },
          '&-success': makeSecondaryButtonStyle(theme, 'success'),
          '&-warning': makeSecondaryButtonStyle(theme, 'warning'),
          '&-error': makeSecondaryButtonStyle(theme, 'error'),
          '&-info': makeSecondaryButtonStyle(theme, 'info')
        }
      }
    },
    contained: {
      boxShadow: 0,
      '&:not($disabled)': {
        '&.customColor': {
          '&-success': makeContainedButtonStyle(theme, 'success'),
          '&-warning': makeContainedButtonStyle(theme, 'warning'),
          '&-error': makeContainedButtonStyle(theme, 'error'),
          '&-info': makeContainedButtonStyle(theme, 'info')
        }
      }
    },
    startIcon: {
      // !important needed to override all sizes
      // should be remove when https://github.com/cozy/cozy-ui/issues/1808 is fixed
      marginLeft: '0 !important'
    }
  },
  MuiTabs: {
    root: {
      '&.segmented': {
        borderRadius: '99px',
        backgroundColor: theme.palette.background.contrast,
        overflow: 'visible',
        minHeight: '2.5rem',
        '& $indicator': {
          top: '1px',
          height: 'calc(100% - 2px)',
          transform: 'scale(0.99)',
          borderRadius: '99px',
          zIndex: 0,
          boxShadow: theme.shadows[1],
          backgroundColor: theme.palette.background.paper
        },
        '& $fixed': {
          overflow: 'visible !important'
        },
        '& $scrollButtons': {
          borderRadius: '99px'
        }
      }
    }
  },
  MuiTab: {
    root: {
      ...theme.typography.subtitle2,
      '&:hover': {
        color: theme.palette.text.primary,
        opacity: 1
      },
      '&:focus': {
        color: theme.palette.text.primary
      },
      '&.narrowed': {
        minWidth: 'auto',
        [theme.breakpoints.up('sm')]: {
          minWidth: 'auto'
        }
      },
      '&.segmented': {
        ...theme.typography.body2,
        textTransform: 'initial',
        zIndex: 1,
        borderRadius: '99px',
        minHeight: '2.5rem',
        '&$selected': {
          color: theme.palette.text.primary
        }
      }
    }
  },
  MuiAccordion: {
    rounded: {
      borderRadius: theme.shape.borderRadius
    },
    root: {
      boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
      borderWidth: '0.0625rem',
      borderStyle: 'solid',
      borderColor: theme.palette.border.main,
      overflow: 'hidden',
      marginBottom: '1rem'
    }
  },
  MuiAccordionSummary: {
    expanded: {},
    root: {
      backgroundColor: theme.palette.grey[100],
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '0.875rem',
      minHeight: '3.5rem',
      padding: 0,
      color: theme.palette.text.primary,
      '&$expanded': {
        minHeight: '3.5rem'
      }
    },
    expandIcon: {
      order: 0,
      '&&': {
        marginLeft: '0.3125rem'
      },
      transform: 'rotate(-90deg)',
      '&$expanded': {
        marginLeft: '0.3125rem',
        transform: 'rotate(0)'
      }
    },
    content: {
      margin: '0.75rem 0',
      paddingLeft: '0.5rem',
      paddingRight: '0.25rem',
      order: 1,
      '& > :last-child': {
        paddingRight: 0
      },
      '&$expanded': {
        margin: '0.75rem 0'
      }
    }
  },
  MuiAccordionDetails: {
    root: {
      padding: 0,
      borderTop: `0.0625rem solid ${theme.palette.border.main}`
    }
  },
  MuiStepConnector: {
    line: {
      borderColor: theme.palette.grey[300]
    }
  },
  MuiList: {
    padding: {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  MuiListItemIcon: {
    root: {
      minWidth: 'auto',
      marginRight: '1rem',
      padding: 0,
      width: 32,
      justifyContent: 'center'
    }
  },
  MuiListItem: {
    root: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: '3.5rem'
    },
    gutters: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [theme.breakpoints.up('md')]: {
        '&.listItem--dialog': {
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }
      }
    },
    dense: {
      minHeight: '3.5rem',
      paddingTop: 0,
      paddingBottom: 0
    },
    secondaryAction: {
      paddingRight: '2rem'
    },
    button: {
      '&$selected, &$selected:hover': {
        backgroundColor: theme.palette.action.selected
      },
      '&:hover': {
        backgroundColor: theme.palette.background.default
      },
      '&:focus': {
        backgroundColor: theme.palette.background.default
      }
    }
  },
  MuiListItemText: {
    root: {
      padding: '14px 0'
    },
    dense: {
      fontSize: null
    },
    primary: {
      '&$dense': {
        fontSize: null
      }
    },
    secondary: {
      '&$dense': {
        fontSize: null
      }
    },
    multiline: {
      marginTop: 0,
      marginBottom: 0
    }
  },
  MuiListSubheader: {
    root: {
      borderTop: '1px solid transparent',
      borderBottom: '1px solid transparent',
      marginBottom: '-1px',
      padding: 0,
      height: '2rem',
      backgroundColor: theme.palette.background.paper,
      textIndent: '1rem',
      fontWeight: 'bold',
      fontSize: '.75rem',
      textTransform: 'uppercase',
      alignItems: 'center',
      display: 'flex',
      lineHeight: 1.33,
      color: theme.palette.text.secondary,
      [theme.breakpoints.up('sm')]: {
        textIndent: '2rem'
      }
    },
    gutters: {
      paddingLeft: 0,
      paddingRight: 0
    },
    sticky: {
      backgroundColor: theme.palette.background.default
    }
  },
  MuiListItemSecondaryAction: {
    root: {
      zIndex: 1,
      right: 0
    }
  },
  MuiMenuItem: {
    root: {
      minHeight: 'auto',
      paddingTop: 4,
      paddingBottom: 4,
      color: theme.palette.grey[800],
      border: 0,
      '&:last-child': {
        borderBottom: 0
      }
    },
    gutters: {
      paddingLeft: 24,
      paddingRight: 24
    }
  },
  MuiTextField: {
    borderWidth: '0.0625rem'
  },
  MuiFormLabel: {
    root: {
      color: theme.palette.text.secondary
    }
  },
  MuiFormHelperText: {
    root: {
      fontStyle: 'italic',
      fontSize: '0.875rem',
      marginTop: 4
    }
  },
  MuiDialog: {
    paper: {
      '&.small': {
        width: '480px',
        maxWidth: '480px',
        [theme.breakpoints.down('md')]: {
          margin: '16px',
          padding: '0 8px 8px',
          height: 'auto',
          maxHeight: 'calc(100% - 32px)',
          borderRadius: '6px'
        }
      },
      '&.medium': {
        [theme.breakpoints.up('md')]: {
          width: '544px',
          maxWidth: '544px'
        }
      },
      '&.large': {
        [theme.breakpoints.up('md')]: {
          width: '800px',
          maxWidth: '800px'
        }
      }
    },
    scrollPaper: {
      '&.alignTop': {
        alignItems: 'start'
      }
    },
    paperFullScreen: {
      '& .cozyDialogActions': {
        paddingBottom: 'env(safe-area-inset-bottom)'
      }
    }
  },
  MuiDialogTitle: {
    root: {
      '.flagship-app .MuiDialog-paperFullScreen &': {
        paddingTop: 'calc(var(--flagship-top-height) + 0.75rem) !important'
      },
      ...theme.typography.h3,
      boxSizing: 'border-box',
      width: '100%',
      padding: '1.5rem 2rem',
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.h4,
        padding: '0.75rem 1rem'
      },
      '&.dialogTitleWithBack': {
        paddingLeft: '4rem', // padding base (2rem) + buttonWidth (1rem) + buttonMargin (1rem)
        [theme.breakpoints.down('sm')]: {
          paddingLeft: '3rem' // padding base (1rem) + buttonWidth (1rem) + buttonMargin (1rem)
        }
      },
      '&.dialogTitleWithClose': {
        paddingRight: '4rem', // padding base (2rem) + buttonWidth (1rem) + buttonMargin (1rem)
        [theme.breakpoints.down('sm')]: {
          paddingRight: '3rem' // padding base (1rem) + buttonWidth (1rem) + buttonMargin (1rem)
        }
      },
      '&.dialogTitleFluid': {
        paddingTop: 0
      }
    }
  },
  MuiDialogContent: {
    root: {
      '.flagship-app .MuiDialog-paperFullScreen &': {
        marginBottom: 'var(--flagship-bottom-height) !important'
      },
      padding: '24px 32px 0',
      [theme.breakpoints.down('sm')]: {
        padding: '24px 16px 0'
      },
      '&.disableGutters': {
        padding: 0,
        '& .dialogContentInner': {
          marginBottom: 0
        },
        '& .dialogTitleFluidContainer': {
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0
        }
      },
      '& .dialogContentInner': {
        marginBottom: '24px',
        '&.withFluidActions': {
          [theme.breakpoints.down('sm')]: {
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '& .dialogContentWrapper': {
              flexGrow: 1,
              '&:not(.withActions)': {
                paddingBottom: '16px'
              }
            },
            '& .cozyDialogActions': {
              paddingBottom: '16px'
            }
          }
        },
        '& .dialogTitleFluidContainer': {
          marginLeft: '-2rem',
          marginRight: '-2rem',
          [theme.breakpoints.down('sm')]: {
            marginLeft: '-1rem',
            marginRight: '-1rem',
            marginTop: '-0.75rem'
          }
        }
      }
    }
  },
  MuiDialogActions: {
    root: {
      margin: '16px 32px',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        margin: '8px 16px',
        '& button': {
          flexGrow: 1
        }
      },
      '&.dialogActionsFluid': {
        margin: '24px 0 0'
      },
      '&.columnLayout': {
        display: 'flex',
        flexDirection: 'column-reverse',
        '& button': {
          width: '100%',
          margin: 0,
          '&:not(:first-child)': {
            marginBottom: '8px'
          }
        }
      },

      // To keep muiV3 behavior
      // TODO check later if we need this behavior
      '&:not(.columnLayout) > :not(:first-child):not(:first-child)': {
        marginLeft: 4
      }
    }
  },
  MuiDivider: {
    inset: {
      marginLeft: 64,
      '&.divider--dialog': {
        marginLeft: 80
      }
    }
  },
  MuiSwitch: {
    checked: {
      '& + $track$track': {
        opacity: 1
      }
    },
    switchBase: {
      top: 1,
      '&$checked': {
        transform: 'translateX(15px)'
      }
    },
    thumb: {
      width: 16,
      height: 16,
      backgroundColor: theme.palette.grey[0]
    },
    track: {
      width: SWITCH_BAR_WIDTH,
      height: 12,
      opacity: 1,
      backgroundColor: theme.palette.text.disabled
    },
    colorSecondary: {
      '&$checked': {
        '& + $track': {
          backgroundColor: theme.palette.success.main
        }
      }
    },
    disabled: {
      '&$checked + $track': {
        backgroundColor: `${theme.palette.grey[200]} !important`
      },
      '& $thumb': {
        backgroundColor: 'white'
      }
    }
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: theme.palette.grey[700],
      borderRadius: '8px',
      fontSize: '1rem',
      color: 'white',
      lineHeight: '1.3',
      padding: '16px'
    },
    arrow: {
      color: theme.palette.grey[700]
    },
    popper: {
      opacity: 0.9
    }
  },
  MuiIconButton: {
    root: {
      color: theme.palette.text.secondary,
      '&.small': {
        padding: 3
      },
      '&.medium': {
        padding: 12
      },
      '&.large': {
        padding: 16
      },
      '&.dialogIconButton': {
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          backgroundColor: theme.palette.action.selected
        }
      }
    }
  },
  MuiBadge: {
    badge: {
      boxSizing: 'content-box',
      padding: 0,
      '&.badgeBorder': {
        border: `2px solid ${theme.palette.background.paper}`
      },
      '&.badgeSizeLarge': {
        fontSize: '.6875rem',
        height: '1rem',
        minWidth: '1rem'
      },
      '&.badgeSizeMedium': {
        height: '.875rem',
        minWidth: '.875rem',
        fontSize: '.625rem'
      },
      '&.badgeSizeSmall': {
        height: '.75rem',
        minWidth: '.75rem',
        fontSize: '.5rem'
      }
    },
    anchorOriginTopRightRectangular: {
      transform: 'scale(1) translate(37%, -37%)'
    },
    anchorOriginBottomRightRectangular: {
      transform: 'scale(1) translate(37%, 37%)'
    },
    anchorOriginBottomLeftRectangular: {
      transform: 'scale(1) translate(-37%, 37%)'
    },
    anchorOriginTopLeftRectangular: {
      transform: 'scale(1) translate(-37%, -37%)'
    },
    dot: {
      borderRadius: '100%',
      padding: 0,
      '&.badgeSizeLarge': {
        height: '.625rem',
        minWidth: '.625rem'
      },
      '&.badgeSizeMedium': {
        height: '.5rem',
        minWidth: '.5rem'
      },
      '&.badgeSizeSmall': {
        height: '.375rem',
        minWidth: '.375rem'
      }
    }
  },
  MuiRadio: {
    root: {
      padding: '12px',
      '&$disabled svg': {
        borderRadius: '50%',
        backgroundColor: theme.palette.background.default,
        fill: theme.palette.border.disabled
      },
      '&:not($checked) svg': {
        fill: theme.palette.border.main
      }
    },
    colorPrimary: {
      '&$checked svg': {
        fill: theme.palette.primary.main
      },
      '&$disabled&$checked svg': {
        fill: theme.palette.text.disabled
      }
    },
    colorSecondary: {
      '&$checked svg': {
        fill: theme.palette.error.main
      },
      '&$disabled&$checked svg': {
        fill: theme.palette.text.disabled
      }
    }
  },
  MuiChip: {
    root: {
      '&.noLabel': {
        width: '32px',
        '& $label': {
          display: 'none'
        },
        '& $icon': {
          margin: 0
        }
      },
      '&.customColor': {
        '&-primary': makeChipStyleByColor(theme, 'primary'),
        '&-success': makeChipStyleByColor(theme, 'success'),
        '&-error': makeChipStyleByColor(theme, 'error'),
        '&-warning': makeChipStyleByColor(theme, 'warning'),
        '&-info': makeChipStyleByColor(theme, 'info')
      }
    }
  },
  MuiAlert: {
    root: {
      padding: '8px 16px',
      '&.cozyAlert': {
        '&-primary': makeAlertColor(theme, 'primary'),
        '&-secondary': makeAlertColor(theme, 'secondary')
      },
      '& $icon': {
        paddingTop: '9px'
      },
      '&.block': {
        flexWrap: 'wrap',
        '& $action': {
          display: 'block',
          width: '100%',
          paddingLeft: 0,
          textAlign: 'right'
        }
      }
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    action: {
      marginRight: '-6px'
    }
  },
  MuiAlertTitle: {
    root: {
      width: '100%',
      fontWeight: 'bold'
    }
  },
  MuiSnackbarContent: {
    root: {
      padding: '4px 12px',
      backgroundColor: theme.palette.grey[600]
    }
  }
})

const makeInvertedOverrides = invertedTheme => {
  const invertedOverrides = {
    ...makeOverrides(invertedTheme),
    MuiOutlinedInput: {
      root: {
        boxSizing: 'border-box',
        '&$focused $notchedOutline': {
          borderColor: invertedTheme.palette.text.primary,
          borderWidth: '0.0625rem'
        },
        '& $notchedOutline': {
          borderColor: invertedTheme.palette.text.primary
        }
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: invertedTheme.palette.text.primary
        }
      }
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: 'rgba(255,255,255,0.2)'
      },
      colorSecondary: {
        backgroundColor: 'rgba(255,255,255,0.2)'
      }
    },
    MuiCheckbox: {
      colorPrimary: {
        '&$checked:not($disabled)': {
          color: invertedTheme.palette.primary.light
        }
      },
      colorSecondary: {
        '&$checked:not($disabled)': {
          color: invertedTheme.palette.error.main
        }
      }
    },
    MuiAlert: {
      ...makeOverrides(invertedTheme).MuiAlert,
      root: {
        ...makeOverrides(invertedTheme).MuiAlert.root,
        '&.cozyAlert': {
          '&-primary': makeAlertInvertedColor(invertedTheme, 'primary'),
          '&-secondary': makeAlertInvertedColor(invertedTheme, 'secondary'),
          '&-success': makeAlertInvertedColor(invertedTheme, 'success'),
          '&-error': makeAlertInvertedColor(invertedTheme, 'error'),
          '&-warning': makeAlertInvertedColor(invertedTheme, 'warning'),
          '&-info': makeAlertInvertedColor(invertedTheme, 'info')
        }
      }
    },
    MuiSnackbarContent: {
      ...makeOverrides(invertedTheme).MuiSnackbarContent,
      root: {
        ...makeOverrides(invertedTheme).MuiSnackbarContent.root,
        backgroundColor: invertedTheme.palette.grey[200]
      }
    }
  }

  invertedOverrides.MuiTabs.root['&.segmented'][
    '& $indicator'
  ].backgroundColor = invertedTheme.palette.primary.main

  invertedOverrides.MuiTab.root['&.segmented']['&$selected'].color =
    invertedTheme.palette.primary.contrastText

  invertedOverrides.MuiSwitch = {
    ...invertedOverrides.MuiSwitch,
    switchBase: {
      ...invertedOverrides.MuiSwitch.switchBase,
      color: invertedTheme.palette.grey[100]
    },
    colorPrimary: {
      '&$checked': {
        '& + $track': {
          backgroundColor: invertedTheme.palette.success.dark
        }
      }
    },
    colorSecondary: {
      '&$checked': {
        '& + $track': {
          backgroundColor: invertedTheme.palette.success.dark
        }
      }
    }
  }

  return invertedOverrides
}
