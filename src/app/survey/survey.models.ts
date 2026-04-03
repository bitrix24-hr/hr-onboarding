export interface SurveyQuestion {
  key: string;
  label: string;
  type?: 'rating' | 'text'; // default = rating
}

export interface SurveyStep {
  title: string;
  subtitle: string;
  description?: string;
  questions: SurveyQuestion[];
}

export interface SurveyConfig {
  type: 'week1' | 'month';
  welcomeTitle: string;
  welcomeText: string;
  welcomeBadge: string;
  steps: SurveyStep[];
}

export const WEEK1_SURVEY: SurveyConfig = {
  type: 'week1',
  welcomeBadge: '1 неделя',
  welcomeTitle: 'Привет',
  welcomeText:
    'Ты с нами уже целую неделю! Нам очень важно узнать, как у тебя дела и как проходит адаптация в команде.',
  steps: [
    {
      title: 'Первый день',
      subtitle: 'Шаг 1 из 4',
      questions: [{ key: 'first_day', label: 'Как прошёл твой первый рабочий день?' }],
    },
    {
      title: 'Выход на работу',
      subtitle: 'Шаг 2 из 4',
      description: 'Оцени удовлетворённость по каждому пункту',
      questions: [
        { key: 'workplace_ready', label: 'Моё рабочее место было полностью подготовлено' },
        { key: 'team_welcome', label: 'Коллеги и руководитель были рады моему выходу' },
        { key: 'tasks_info', label: 'Мне дали всю информацию по задачам и обязанностям' },
        { key: 'evaluation_explained', label: 'Мне объяснили, как будет оцениваться моя работа на ИС' },
        { key: 'team_integration', label: 'Меня представили коллегам и интегрировали в команду' },
        { key: 'facilities_info', label: 'Рассказали о бытовых условиях, питании и отдыхе' },
        { key: 'questions_contact', label: 'Я знал(а), к кому обращаться с вопросами' },
      ],
    },
    {
      title: 'Знакомство с компанией',
      subtitle: 'Шаг 3 из 4',
      description: 'Оцени свой опыт первой недели',
      questions: [
        { key: 'manager_support', label: 'Поддержка руководителя / наставника' },
        { key: 'colleagues_help', label: 'Помощь коллег' },
        { key: 'info_clarity', label: 'Доступность и понятность информации о компании и процессах' },
        { key: 'info_quality', label: 'Объём и качество предоставленной информации' },
        { key: 'response_speed', label: 'Скорость получения ответов на вопросы' },
        { key: 'feel_belonging', label: 'Чувствуешь ли ты себя на своём месте, приходя на работу?' },
      ],
    },
  ],
};

export const MONTH_SURVEY: SurveyConfig = {
  type: 'month',
  welcomeBadge: 'Адаптация',
  welcomeTitle: 'Привет',
  welcomeText:
    'Мы хотим узнать, как у тебя дела и как проходит адаптация. Твои ответы помогут нам стать лучше.',
  steps: [
    {
      title: 'Общие впечатления',
      subtitle: 'Шаг 1 из 5',
      description: 'Расскажи о своих ощущениях',
      questions: [
        { key: 'expectations_vs_reality', label: 'Как соотносятся твои ожидания от работы с реальными задачами и условиями?' },
        { key: 'feel_belonging', label: 'Чувствуешь ли ты себя на своём месте, приходя на работу?' },
        { key: 'feel_belonging_comment', label: 'Прокомментируй свой ответ (необязательно)', type: 'text' },
        { key: 'what_you_like', label: 'Что тебе больше всего нравится в твоей работе?', type: 'text' },
        { key: 'what_worries', label: 'Что больше всего волновало или беспокоило за время работы?', type: 'text' },
      ],
    },
    {
      title: 'Удовлетворённость работой',
      subtitle: 'Шаг 2 из 5',
      description: 'Оцени параметры текущей работы',
      questions: [
        { key: 'work_rhythm', label: 'Ритм работы' },
        { key: 'work_conditions', label: 'Условия труда (рабочее место, оборудование, девайсы)' },
        { key: 'salary_fairness', label: 'Соизмеримость усилий оплате труда' },
        { key: 'tasks_satisfaction', label: 'Задачи, которые ты выполняешь' },
        { key: 'colleagues_relations', label: 'Отношения с коллегами' },
        { key: 'manager_relations', label: 'Отношения с руководителем' },
        { key: 'team_atmosphere', label: 'Общая атмосфера в коллективе' },
        { key: 'corporate_culture', label: 'Особенности корпоративной культуры' },
        { key: 'internal_processes', label: 'Организация внутренних процессов в компании' },
      ],
    },
    {
      title: 'Развитие и обучение',
      subtitle: 'Шаг 3 из 5',
      description: 'Оцени, насколько ты согласен с высказываниями',
      questions: [
        { key: 'know_what_to_learn', label: 'Я знаю, чему должен обучиться, чтобы выполнять работу лучше' },
        { key: 'colleagues_support', label: 'Я получаю своевременную помощь коллег в достаточном объёме' },
        { key: 'handle_tasks_well', label: 'Я хорошо справляюсь с поставленными задачами и объёмом работы' },
        { key: 'enough_skills', label: 'Мне хватает знаний и навыков для выполнения работы' },
        { key: 'enjoy_work', label: 'Мне нравится то, чем я занимаюсь' },
        { key: 'clear_goals', label: 'Я чётко осознаю свои цели, понимаю, что от меня ожидают' },
      ],
    },
    {
      title: 'Коммуникация и ценности',
      subtitle: 'Шаг 4 из 5',
      description: 'Оцени, насколько ты согласен с высказываниями',
      questions: [
        { key: 'understand_processes', label: 'Мне понятны рабочие процессы и то, как я в них встроен' },
        { key: 'opinion_valued', label: 'Моё мнение и идеи учитываются коллегами и руководством' },
        { key: 'communication_speed', label: 'Меня устраивает скорость коммуникации с коллегами' },
        { key: 'feel_productive', label: 'Я чувствую себя продуктивным, чувствую свою полезность' },
        { key: 'values_match', label: 'Ценности компании отвечают моим собственным принципам' },
      ],
    },
  ],
};
