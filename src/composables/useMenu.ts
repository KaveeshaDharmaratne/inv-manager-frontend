import { useRoute } from 'vue-router';

export function useMenu() {
  const route = useRoute();

  /**
   * Checks if any child in the list matches the current active route.
   * Used to highlight parent menu items.
   */
  const isParentActive = (children: { to?: string }[] | undefined): boolean => {
    if (!children) return false;
    return children.some((child) => child.to === route.path);
  };

  return {
    isParentActive,
  };
}