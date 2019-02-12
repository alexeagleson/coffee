
const review = {
    questions: [
        {
            questionID: 1,
            questionText: "Does the dealer site follow the recommended information architecture (sitemap) as per Centre of Excellence standards?",
            answerOptions: ['yes', 'somewhat', 'no'],
            threshold: '4 OR LESS ERRORS = SOMEWHAT, MORE THAN 5 ERRORS = NO',
            screenshotRequired: true,
            comments: [
                {
                    forAnswer: 'no',
                    english: 'There are many inconsistencies with the Centre of Excellence Information Architecture standard on your web site. Please refer to this standard so that you can make the appropriate enhancements.',
                    french: 'Votre site Web présente de nombreuses incohérences en rapport avec la norme sur l’architecture de l’information du Centre de l’Excellence. Veuillez vous référer aux exigences de cette norme, afin de pouvoir apporter les changements appropriés.',
                },
                {
                    forAnswer: 'somewhat',
                    english: 'There is an inconsistency with the Centre of Excellence Centre of Excellence Information Architecture  standard. Please refer to this standard so that you can make the appropriate enhancements.',
                    french: 'Votre site Web présente une incohérence en rapport avec la norme sur l’architecture de l’information du Centre de l’Excellence. Veuillez vous référer aux exigences de cette norme, afin de pouvoir apporter les changements appropriés.',
                },
                {
                    forAnswer: 'somewhat',
                    english: 'There are some inconsistencies with the Centre of Excellence Information Architecture  standard on your web site. Please refer to this standard so that you can make the appropriate enhancements.',
                    french: 'Votre site Web présente quelques incohérences en rapport avec la norme sur l’architecture de l’information du Centre de l’Excellence. Veuillez vous référer aux exigences de cette norme, afin de pouvoir apporter les changements appropriés.',
                },
            ]
        },
        {
            questionID: 2,
            questionText: "Are best practices for labeling menu items, including the correct language & terminology being followed for both English and French (where applicable)?",
            answerOptions: ['yes', 'somewhat', 'no'],
            threshold: '4 OR LESS ERRORS = SOMEWHAT, 5 OR MORE ERRORS = NO',
            screenshotRequired: true,
            comments: [
                {
                    forAnswer: 'no',
                    english: 'There are many inconsistencies with the Centre of Excellence Naming Requirements standard on your web site. Please refer to this standard so that you can make the appropriate enhancements.',
                    french: 'Votre site Web présente de nombreuses incohérences en rapport avec la norme sur la nomenclature du Centre de l’Excellence. Veuillez vous référer aux exigences de cette norme, afin de pouvoir apporter les changements appropriés.',
                },
                {
                    forAnswer: 'somewhat',
                    english: 'There are some inconsistencies with the Centre of Excellence Naming Requirements standard on your web site. Please refer to this standard so that you can make the appropriate enhancements.',
                    french: 'Votre site Web présente quelques incohérences en rapport avec la norme sur la nomenclature du Centre de l’Excellence. Veuillez vous référer aux exigences de cette norme, afin de pouvoir apporter les changements appropriés.',
                },
            ]
        },
        {
            questionID: 3,
            questionText: "Does the main dealer site navigation and associated drop-downs consist of no more than 7 items?",
            answerOptions: ['yes', 'somewhat', 'no'],
            threshold: 'IF ONE DROP-DOWN SECTION ERROR = SOMEWHAT, IF MAIN NAVIGATION OR 2 OR MORE DROP-DOWNS = NO',
            screenshotRequired: true,
            comments: [
                {
                    forAnswer: 'no',
                    english: 'There are sections in your web site navigation that contains more than 7 items. Please ensure that you have less than 7 items in your main navigation and associated drop-downs as per the Centre of Excellence standard.',
                    french: 'Plusieurs sections de votre site Web comportent plus de 7 éléments dans la navigation principale et les menus déroulants associés. Veuillez vous assurer que ces sections comportent moins de 7 éléments, afin de vous conformer aux normes du Centre de l’Excellence.',
                },
                {
                    forAnswer: 'somewhat',
                    english: 'There is a drop-down section in your web site navigation that contains more than 7 items. Please ensure that you have less than 7 items in your main navigation and associated drop-downs as per the Centre of Excellence standard.',
                    french: 'Un menu déroulant de la navigation de votre site Web comporte plus de 7 éléments. Veuillez vous assurer que la navigation principale et tous les menus déroulants associés comportent moins de 7 éléments, afin de vous conformer aux normes du Centre de l’Excellence.',
                },
            ]
        },
        {
            questionID: 4,
            questionText: "end of questions",
            answerOptions: [],
            threshold: 'IF ONE DROP-DOWN SECTION ERROR = SOMEWHAT, IF MAIN NAVIGATION OR 2 OR MORE DROP-DOWNS = NO',
            screenshotRequired: true,
            comments: []
        },
    ],
};

module.exports = { review };