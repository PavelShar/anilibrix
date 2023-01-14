import {ipcRenderer} from "electron";
import {SHOW_APP_ABOUT} from "@main/handlers/app/showAppAbout";

export default () => ipcRenderer.invoke(SHOW_APP_ABOUT);
