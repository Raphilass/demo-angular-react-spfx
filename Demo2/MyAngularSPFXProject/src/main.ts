import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { loadTheme } from "office-ui-fabric-react/lib/Styling";

if (environment.production) {
  enableProdMode();
}

initializeIcons();

loadTheme({
  semanticColors:{
    
  },
  palette: {
    themePrimary: "#600063",
    themeLighterAlt: "#ebd0ec",
    themeLighter: "#daa9db",
    themeLight: "#c885ca",
    themeTertiary: "#b666b9",
    themeSecondary: "#a54aa8",
    themeDarkAlt: "#933297",
    themeDark: "#821d86",
    themeDarker: "#710d75",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#ffffff"
  }
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
