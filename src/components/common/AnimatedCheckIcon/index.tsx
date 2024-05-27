import { motion } from "framer-motion"

const AnimatedCheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      height={28}
      width={28}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25 }}
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

export default AnimatedCheckIcon
