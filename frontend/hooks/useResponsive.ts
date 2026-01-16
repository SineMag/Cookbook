import { useWindowDimensions } from "react-native";
import { dimensions } from "../constants";

export function useResponsive() {
  const { width } = useWindowDimensions();

  const isSmall = width < dimensions.breakpoints.md;
  const isMedium =
    width >= dimensions.breakpoints.md && width < dimensions.breakpoints.lg;
  const isLarge =
    width >= dimensions.breakpoints.lg && width < dimensions.breakpoints.xl;
  const isExtraLarge = width >= dimensions.breakpoints.xl;

  const getColumns = () => {
    if (width < dimensions.breakpoints.sm) return dimensions.grid.columns.xs;
    if (width < dimensions.breakpoints.md) return dimensions.grid.columns.sm;
    if (width < dimensions.breakpoints.lg) return dimensions.grid.columns.md;
    if (width < dimensions.breakpoints.xl) return dimensions.grid.columns.lg;
    return dimensions.grid.columns.xl;
  };

  const getContainerMaxWidth = () => {
    if (width < dimensions.breakpoints.md)
      return dimensions.container.maxWidth.sm;
    if (width < dimensions.breakpoints.lg)
      return dimensions.container.maxWidth.md;
    if (width < dimensions.breakpoints.xl)
      return dimensions.container.maxWidth.lg;
    if (width < dimensions.breakpoints.xxl)
      return dimensions.container.maxWidth.xl;
    return dimensions.container.maxWidth.xxl;
  };

  return {
    width,
    height: useWindowDimensions().height,
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    isTablet:
      width >= dimensions.breakpoints.md && width < dimensions.breakpoints.lg,
    isDesktop: width >= dimensions.breakpoints.lg,
    columns: getColumns(),
    containerMaxWidth: getContainerMaxWidth(),
    currentBreakpoint:
      width < dimensions.breakpoints.sm
        ? "sm"
        : width < dimensions.breakpoints.md
        ? "md"
        : width < dimensions.breakpoints.lg
        ? "lg"
        : width < dimensions.breakpoints.xl
        ? "xl"
        : "xxl",
  };
}
