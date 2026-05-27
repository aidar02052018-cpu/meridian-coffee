export interface Tariff {
  id: 'znakomstvo' | 'postoyanstvo' | 'otkryvatel';
  name: string;
  tagline: string;
  weight: string;
  frequency: string;
  pricePerMonth: number;
  description: string;
  features: string[];
}

export const TARIFFS: Tariff[] = [
  {
    id: 'znakomstvo',
    name: 'Знакомство',
    tagline: 'для тех, кто только начинает',
    weight: '250 г',
    frequency: 'каждые 4 недели',
    pricePerMonth: 850,
    description: 'Разнообразие зёрен по нашему выбору — каждый месяц новое.',
    features: [
      'Зерно выбираем мы',
      'Можно поставить на паузу',
      'Письмо с историей зерна в каждой посылке',
    ],
  },
  {
    id: 'postoyanstvo',
    name: 'Постоянство',
    tagline: 'для верных одному зерну',
    weight: '250 г',
    frequency: 'каждые 2 недели',
    pricePerMonth: 1700,
    description: 'Вы выбираете зерно — мы регулярно его пополняем. Меняйте когда хотите.',
    features: [
      'Вы выбираете зерно',
      'Свежая обжарка раз в 2 недели',
      'Смена зерна в любой момент',
    ],
  },
  {
    id: 'otkryvatel',
    name: 'Открыватель',
    tagline: 'для тех, кто хочет всего',
    weight: '500 г',
    frequency: 'каждые 2 недели',
    pricePerMonth: 3300,
    description: 'Ротация по вкусовому профилю — каждая посылка раскрывает новый стиль.',
    features: [
      '500 г каждые 2 недели',
      'Ротация по профилям',
      'Доступ к новинкам обжарки первыми',
    ],
  },
];
