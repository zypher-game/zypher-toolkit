import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { memo, useMemo } from "react";

type IListWithMotionProps<T> = {
  parentClassName?: string;
  itemClassName?: string;
  data: T[];
  keyProp?: keyof T;
  renderItem: (item: T) => JSX.Element;
};
const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const ListWithMotion = <T,>(props: IListWithMotionProps<T>) => {
  const { parentClassName, itemClassName, data, renderItem } = props;

  return (
    <AnimatePresence>
      <motion.ul
        className={parentClassName}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((item, index) => (
          <motion.li
            key={`${index}`}
            className={itemClassName}
            variants={itemVariants}
          >
            {renderItem(item)}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default memo(ListWithMotion) as <T>(
  props: IListWithMotionProps<T>
) => JSX.Element;
