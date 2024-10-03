import { registerListeners } from "~/events/listeners";
import { registerActions } from "~/events/actions"
import { registerOptions } from "./events/options";
import { loadVersion } from "./version";
import { restoreUserPreferences } from "./state";

registerListeners();
registerActions();
registerOptions();
loadVersion();

restoreUserPreferences();
