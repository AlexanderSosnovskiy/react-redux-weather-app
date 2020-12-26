import React from 'react';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useSelector, useDispatch } from 'react-redux';
import changeTheme from '../redux/actions/themeAction';

const ThemeModeSwitcher = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);

  return (
    <Switch
      icon={mode ? <Brightness7Icon /> : <Brightness4Icon />}
      checkedIcon={mode ? <Brightness7Icon /> : <Brightness4Icon />}
      onChange={() => dispatch(changeTheme(!mode))}
    />
  );
};

export default ThemeModeSwitcher;
