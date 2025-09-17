import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

type SuccessStepProps = {
  title: string;
  message: string;
};

const SuccessStep = ({
  title,
  message,
}: SuccessStepProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`py-8 text-center md:py-12`}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      className="bg-primary mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full md:mb-6 md:h-24 md:w-24"
    >
      <Check className="h-8 w-8 text-white md:h-12 md:w-12" />
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-success mb-2 text-2xl font-bold md:mb-4 md:text-3xl"
    >
      {title}
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="text-base-content/70 text-base md:text-lg"
    >
      {message}
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-6 md:mt-8"
    >
      <Sparkles className="text-success mx-auto h-10 w-10 md:h-12 md:w-12" />
    </motion.div>
  </motion.div>
);

export default SuccessStep;
