import '../src/stories/index.css'

import { addons } from '@storybook/addons';
import yourTheme from './YourTheme';
addons.setConfig({
  theme: yourTheme,
});