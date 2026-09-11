/**
 * Welcome Dashboard Entry Point
 * Excludes default UmbracoNews / Welcome dashboards so our custom dashboard takes the spotlight.
 */
export const onInit = (host, extensionRegistry) => {
    try {
        if (extensionRegistry && typeof extensionRegistry.exclude === 'function') {
            extensionRegistry.exclude('Umb.Dashboard.UmbracoNews');
            extensionRegistry.exclude('Umb.Dashboard.Welcome');
        }
    } catch (err) {
        console.warn('Could not exclude default Umbraco dashboard:', err);
    }
};
