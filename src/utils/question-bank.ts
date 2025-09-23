export function getRandomQuestions(
  questions: Record<
    number,
    { question: string; options: string[]; answer: number; info: string }
  >,
  count: number
) {
  const keys = Object.keys(questions).map(Number);
  const actualCount = Math.min(count, keys.length);

  const shuffled = [...keys];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selectedKeys = shuffled.slice(0, actualCount);

  return selectedKeys.map((key) => ({
    id: key,
    ...questions[key],
  }));
}

export const P1L1quizFormQuestions: Record<
  number,
  { question: string; options: string[]; answer: number; info: string }
> = {
  1: {
    question: "What were some of the earliest forms of money?",
    options: [
      "Seashells and grain",
      "Credit cards",
      "Paper banknotes",
      "Bitcoin",
    ],
    answer: 0,
    info: "Seashells and grains are some of the earliest forms of money because people first traded natural items of value before coins and paper existed.",
  },
  2: {
    question: "After trading items, what became the next big step in money?",
    options: ["Gold", "Plastic tokens", "Digital wallets", "Shells"],
    answer: 0,
    info: "Gold became the next big step in money because it is rare and widely trusted as a valuable, durable form of money.",
  },
  3: {
    question: "Who controlled the use of paper money when it first appeared?",
    options: ["Local shopkeepers", "Banks", "Blockchain miners", "Travelers"],
    answer: 1,
    info: "Banks controlled the use of paper money and were in charge of issuing and managing it.",
  },
  4: {
    question: "What makes digital money unique compared to paper money?",
    options: [
      "It lives only online",
      "It’s printed by every country",
      "It can’t be exchanged",
      "It’s only for gamers",
    ],
    answer: 0,
    info: "Digital money exists virtually, not as physical notes.",
  },
  5: {
    question: "What does “decentralized ownership” in blockchain mean?",
    options: [
      "One government owns it",
      "No single person or group controls it",
      "It’s only owned by banks",
      "Everyone gets the same password",
    ],
    answer: 1,
    info: "Blockchain is shared across many computers with no central owner.",
  },
  6: {
    question: "Why are neo banking and borderless payments exciting?",
    options: [
      "They’re fast, global, and open to everyone",
      "They only work in one country",
      "They’re slower than traditional banks",
      "They use only paper money",
    ],
    answer: 0,
    info: "Neo banking and borderless payments are exciting because anyone, anywhere can use them instantly without barriers",
  },
};

export const P1L2quizFormQuestions: Record<
  number,
  { question: string; options: string[]; answer: number; info: string }
> = {
  1: {
    question: "What powers cryptocurrency?",
    options: [
      "Credit card networks",
      "Blockchain",
      "Central banks",
      "Gold reserves",
    ],
    answer: 1,
    info: "Blockchain is the system that records and secures all transactions on a decentralized ledger.",
  },
  2: {
    question: "Why is cryptocurrency considered safe?",
    options: [
      "It’s hidden in vaults",
      "Only one company controls it",
      "It’s shared across thousands of computers",
      "It can’t be spent",
    ],
    answer: 2,
    info: "The network is decentralized, making it hard to tamper with.",
  },
  3: {
    question: "What makes Bitcoin special?",
    options: [
      "It’s the first paper money",
      "It’s the first decentralized cash",
      "It’s owned by one government",
      "It only works in one country",
    ],
    answer: 1,
    info: "Bitcoin was the first money not controlled by any single authority.",
  },
  4: {
    question: "How is Ethereum different from Bitcoin?",
    options: [
      "It’s only used for shopping",
      "It’s controlled by banks",
      "It’s a platform for apps and smart contracts",
      "It doesn’t use blockchain",
    ],
    answer: 2,
    info: "Ethereum lets people build programs, not just money transfers.",
  },
  5: {
    question: "What’s the difference between coins and tokens?",
    options: [
      "Coins run on their own blockchains, tokens live on platforms like Ethereum",
      "Tokens are physical, coins are digital",
      "Tokens can’t be traded, coins can",
      "Coins are only for rewards",
    ],
    answer: 0,
    info: "Coins like Bitcoin are independent and run on their own blockchains while tokens rely on bigger networks and chains of other coin’s platforms.",
  },
  6: {
    question: "What role does crypto play in the future?",
    options: [
      "It’s just a trend",
      "It replaces video games",
      "It powers borderless payments and finance",
      "It only works offline",
    ],
    answer: 2,
    info: "Crypto enables global transactions without middlemen, therefore powering borderless payments and finance.",
  },
};

export const P1L3quizFormQuestions: Record<
  number,
  { question: string; options: string[]; answer: number; info: string }
> = {
  1: {
    question: "What can you own in the digital world?",
    options: [
      "Only paper money",
      "Art, land, or even a slice of the metaverse",
      "Just bank accounts",
      "Nothing—you can’t own digital items",
    ],
    answer: 1,
    info: "Blockchain lets you hold verified digital property.",
  },
  2: {
    question: "How is digital ownership proven?",
    options: [
      "With paper contracts",
      "By government records",
      "On the blockchain",
      "With secret passwords",
    ],
    answer: 2,
    info: "Blockchain acts as a public, tamper-proof record of ownership.",
  },
  3: {
    question: "What are NFTs?",
    options: [
      "Regular coins",
      "Online games",
      "Unique digital items like art or tickets",
      "Standard banknotes",
    ],
    answer: 2,
    info: "Non Fungible Tokens are one-of-a-kind assets stored on blockchain.",
  },
  4: {
    question: "What’s an example of a tokenized asset?",
    options: [
      "A shopping coupon",
      "Shares in real estate",
      "A concert wristband",
      "A credit card",
    ],
    answer: 1,
    info: "Real-world assets like shares in real estate can be split into digital tokens for fractional investing.",
  },
  5: {
    question: "What can you do in the metaverse with digital ownership?",
    options: [
      "Watch TV only",
      "Buy land, build a shop, or host events",
      "Print more paper money",
      "Collect shells and grain",
    ],
    answer: 1,
    info: "Metaverse platforms allow interactive property ownership.",
  },
  6: {
    question: "What’s the key idea to remember about digital ownership?",
    options: [
      "You only hold items temporarily",
      "It’s the same as renting",
      "You’re not just owning—you’re creating value in a new world",
      "It has no real impact",
    ],
    answer: 2,
    info: "Digital ownership builds new opportunities for the decentralized economy.",
  },
};

export const P2L1quizFormQuestions: Record<
  number,
  { question: string; options: string[]; answer: number; info: string }
> = {
  1: {
    question: "What everyday example is used to explain copy trading?",
    options: [
      "Teachers in schools",
      "Farmers, tailors, and traders",
      "Pilots flying planes",
      "Doctors in hospitals",
    ],
    answer: 1,
    info: "People traditionally learned skills by watching experts",
  },
  2: {
    question: "In finance, what does copy trading allow you to do?",
    options: [
      "Invent your own coins",
      "Follow experienced traders",
      "Avoid all risks",
      "Replace banks completely",
    ],
    answer: 1,
    info: "Your account mirrors experienced trader moves automatically.",
  },
  3: {
    question: "What happens when an expert makes a trade in copy trading?",
    options: [
      "You get a random result",
      "Your account automatically copies their move",
      "You must manually repeat it",
      "Nothing happens at all",
    ],
    answer: 1,
    info: "The system automatically links your trades to theirs in real time.",
  },
  4: {
    question: "What is one benefit of copy trading?",
    options: [
      "It makes trading slower",
      "It saves time",
      "It hides all market data",
      "It removes your control",
    ],
    answer: 1,
    info: "This allows you to save time since you don’t need to analyze every trade yourself.",
  },
  5: {
    question: "Besides saving time, what else can copy trading help you do?",
    options: [
      "Avoid learning",
      "Gain experience",
      "Depend fully on others",
      "Skip decision-making forever",
    ],
    answer: 1,
    info: "You learn strategies and gain experience by observing successful traders.",
  },
  6: {
    question: "How are you described as a copy trader in the neo banking era?",
    options: [
      "A passive observer",
      "A careless risk-taker",
      "A smart explorer",
      "A strict banker",
    ],
    answer: 2,
    info: "You’re learning while staying in control.",
  },
};

export const P2L2quizFormQuestions: Record<
  number,
  { question: string; options: string[]; answer: number; info: string }
> = {
  1: {
    question: "In trading, what do “sunshine and storms” represent?",
    options: [
      "Profits and taxes",
      "Risk and reward",
      "Gains and gossip",
      "Trading apps and websites",
    ],
    answer: 1,
    info: "Every trade has both potential gains and losses.",
  },
  2: {
    question: "How can traders reduce risk?",
    options: [
      "Follow only one trader",
      "Diversify by following multiple traders",
      "Ignore all strategies",
      "Trade randomly",
    ],
    answer: 1,
    info: "Spreading trades lowers exposure to one person’s mistakes.",
  },
  3: {
    question: "What tool helps you control trading losses?",
    options: ["Passwords", "Stop-loss limits", "Coupons", "Extra leverage"],
    answer: 1,
    info: "Stop loss limits automatically close trades before losses grow too big.",
  },
  4: {
    question: "What should you study before copying a trader?",
    options: [
      "Their favorite color",
      "Their trading history—steady or risky",
      "Their lunch choices",
      "Their social media posts",
    ],
    answer: 1,
    info: "A traders past behavior shows their risk style",
  },
  5: {
    question: "Why is leverage important to watch in a trader’s profile?",
    options: [
      "It shows their favorite asset",
      "It shows how much borrowed money they use in trades",
      "It guarantees profits",
      "It cancels all risks",
    ],
    answer: 1,
    info: "Higher leverage means higher risk, although it gives higher rewards.",
  },
  6: {
    question: "What makes decentralized ownership truly powerful?",
    options: [
      "Ignoring risks",
      "Copying blindly",
      "Using smart strategies",
      "Depending only on luck",
    ],
    answer: 2,
    info: "Planning and discipline turn ownership into real value.",
  },
};
