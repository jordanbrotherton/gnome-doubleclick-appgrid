import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as OverviewControls from 'resource:///org/gnome/shell/ui/overviewControls.js';

export default class DoubleClickApps {
    enable() {
        this._doubleClickGesture = new Clutter.ClickGesture();
        this._doubleClickGesture.set_n_clicks_required(2)

        this._doubleClickGesture.connect('recognize', () => {
          if (Main.overview.visible) {
              const checked = Main.overview.dash.showAppsButton.checked;
              Main.overview.dash.showAppsButton.checked = !checked;
          } else {
              Main.overview.show(OverviewControls.ControlsState.APP_GRID);
          }
        });
        Main.panel.statusArea['activities']?.add_action(this._doubleClickGesture);
    }

    disable() {
        if (this._doubleClickGesture) {
            Main.panel.statusArea['activities']?.remove_action(this._doubleClickGesture);
            delete this._doubleClickGesture;
        }
    }
}
