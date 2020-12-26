import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import ThemeModeSwitcher from '../components/themeModeSwitcher';
import { light } from './light';
import { dark } from './dark';

const Theme = props => {
  const mode = useSelector(state => state.theme.mode);
  const theme = createMuiTheme(mode ? light : dark);

  return (
    <ThemeProvider theme={theme}>
      <ThemeModeSwitcher />
      {props.children}
    </ThemeProvider>
  );
};

export default Theme;
