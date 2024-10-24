const SOCIAL_MEDIA_ENUM = {
  TWITTER: 'TWITTER',
  TELEGRAM: 'TELEGRAM',
  DISCORD: 'DISCORD',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  REDDIT: 'REDDIT',
  GITHUB: 'GITHUB',
  YOUTUBE: 'YOUTUBE',
} as const

export const SOCIAL_MEDIAS: {
  value: keyof typeof SOCIAL_MEDIA_ENUM
  icon: string
  iconDark?: string
  title: string
  url: string
}[] = [
  {
    value: 'TWITTER',
    icon: '/assets/img/social-media/twitter-x.svg',
    iconDark: '/assets/img/social-media/twitter-x-white.svg',
    title: 'Twitter/X',
    url: 'https://twitter.com/',
  },
  {
    value: 'TELEGRAM',
    icon: '/assets/img/social-media/telegram.svg',
    title: 'Telegram',
    url: 'https://t.me/',
  },
  {
    value: 'DISCORD',
    icon: '/assets/img/social-media/discord.svg',
    title: 'Discord',
    url: 'https://discord.com/invite/',
  },
  {
    value: 'INSTAGRAM',
    icon: '/assets/img/social-media/instagram.svg',
    title: 'Instagram',
    url: 'https://instagram.com/',
  },
  {
    value: 'FACEBOOK',
    icon: '/assets/img/social-media/facebook.svg',
    title: 'Facebook',
    url: 'https://facebook.com/groups/',
  },
  {
    value: 'REDDIT',
    icon: '/assets/img/social-media/reddit.svg',
    title: 'Reddit',
    url: 'https://reddit.com/r/',
  },
  {
    value: 'GITHUB',
    icon: '/assets/img/social-media/github.svg',
    iconDark: '/assets/img/social-media/github-white.svg',
    title: 'Github',
    url: 'https://github.com/',
  },
  {
    value: 'YOUTUBE',
    icon: '/assets/img/social-media/youtube.svg',
    title: 'Youtube',
    url: 'https://youtube.com/',
  },
] as const
