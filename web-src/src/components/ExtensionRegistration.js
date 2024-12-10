/*
 * <license header>
 */

import { Text } from "@adobe/react-spectrum";
import { register } from "@adobe/uix-guest";

function ExtensionRegistration() {
  const init = async () => {
    const guestConnection = await register({
      id: "exchange-genstudio-claims-app-0",
      methods: {
        prompt: {
          selectAddOn: async (appExtensionId) => {
            const adddOnId = appExtensionId+"-claims-addon-select";
            return {
              id: adddOnId,
              label: "Claims",
              onClick: async () => {
                const hostInfo = await guestConnection.host.api.dialogs.open(`${adddOnId}`);
              },
            }
          },
          loadAddOn: async (appExtensionId) => {
            return {
              id: `${appExtensionId}-claims-addon-app`,
              label: "Claims",
              header: "Claims",
              url: '/#/claims-list',
              extensionId: appExtensionId,
            };
          },
        },
        actionBar: {
          addButtons: async (appExtensionId) => {
            const raiId = appExtensionId+"-claims-validation";
            return [
              {
                id: "sudi-claims-validation",
                label: "Claims by SUDI",
                onClick: async () => {
                  const hostInfo = await guestConnection.host.api.dialogs.open(`${raiId}`);
                },
              }
            ]
          }
        },
        rightPanel: {
          addRails(appExtensionId) {
            return [
              {
                id: `${appExtensionId}-rail_sample_id`,
                header: "Last Changes",
                url: '/#/rail-sample',
                extensionId: appExtensionId,
              }
            ];
          },
        },

      }
    });

  };
  init().catch(console.error);

  return <Text>IFrame for integration with Host (AEM)...</Text>;
}

export default ExtensionRegistration;
