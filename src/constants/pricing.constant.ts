  
  export const plans = [
    {
      name: "Starter",
      monthly: "Free",
      yearly: "Free",
      description: "Ideal for individuals trying things out.",
      features: ["Basic features", "Community support", "Limited usage"],
      highlighted: false,
    },
    {
      name: "Pro",
      monthly: "$19",
      yearly: "$190",
      description: "Perfect for small teams needing more power.",
      features: [
        "Everything in Starter",
        "Priority support",
        "Unlimited usage",
        "Advanced tools",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      monthly: "Custom",
      yearly: "Custom",
      description: "Tailored solutions for larger organizations.",
      features: [
        "Everything in Pro",
        "Dedicated manager",
        "Custom integrations",
        "SLAs & security",
      ],
      highlighted: false,
    },
  ]