import { registerListeners } from "~/events/listeners";
import { registerActions } from "~/events/actions";
import { registerOptions } from "~/events/options";
import { loadVersion } from "~/version";
import { restoreUserPreferences } from "~/state";
import $ from "~/vendor/jquery-extensions";

registerListeners();
registerActions();
registerOptions();
loadVersion();

restoreUserPreferences();

const currentYear = new Date().getFullYear();
$("#year").text((currentYear > 2023) ? "2023 - " + currentYear : 2023);
