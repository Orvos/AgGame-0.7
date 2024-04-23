let questions;
if(localStorage.getItem("questions") == null){
    questions = {
        groups: [{
            "title": "Crops and Agriculture",
            "description": "Questions created by the Agriculture students from 2023-2024 at Assiniboine Community College",
            "enabled": true,
            "questions": [
                {
                "question": "Eggs from a Canadian grocery store are unfertilized.",
                "answers": ["True", "False"],
                },
                {
                "question": "Antibiotic-free beef is better for you.",
                "answers": ["False", "True"],
                },
                {
                "question": "What does GMO stand for?",
                "answers": ["Genetically Modified Organism", "Generally modified Organism", "Genetically monopolized organ", "Gene Modified Organism"],
                },
                {
                "question": "What farm animal does not have functional sweat glands?",
                "answers": ["Pigs", "Cattle", "Sheep", "Chickens"],
                },
                {
                "question": "Canada’s largest bacon processing facility is in Manitoba.",
                "answers": ["True", "False"],
                },
                {
                "question": "What percentage of Canadians are lactose intolerant?",
                "answers": ["44%", "27%", "61%", "32%"],
                },
                {
                "question": "How much of Canadian wheat production is exported?",
                "answers": ["75%", "45%", "85%", "55%"],
                },
                {
                "question": "What province produces the most beef cattle in Canada?",
                "answers": ["Alberta", "Manitoba", "Saskatchewan","Quebec"],
                },
                {
                "question": "What age should a beef heifer be bred?",
                "answers": ["15-18 months", "12-15 months","20 months", "24 months"],
                },
                {
                "question": "True or False, chickens prefer to be housed in small group housing cages over free run.",
                "answers": ["True", "False"],
                },
                {
                "question": "How many times a day is a dairy cow milked?",
                "answers": ["2-3 times", "4-6 times", "1 time", "2 times"],
                },
                {
                "question": "What province produces the most dairy?",
                "answers": ["Quebec", "Ontario", "Manitoba", "Alberta"],
                },
                {
                "question": "Do chickens eat rocks?",
                "answers": ["Yes", "No"],
                },
                {
                "question": "How much feed does it take to make 1kg of body weight in a broiler chicken?",
                "answers": ["1.6kg.", "1kg", "2kg", "3.2kg"],
                },
                {
                "question": "What do you call a female pig who hasn’t had piglets yet?",
                "answers": ["Gilt", "Piglet", "Sow", "Boar"],
                },
                {
                "question": "What is an immature male chicken called?",
                "answers": ["Cockerel", "Capon", "Rooster", "Broiler"]
                },
                {
                "question": "What is a term for a young female chicken who is yet to lay eggs?",
                "answers": ["Pullet", "Hen", "rooster", "Cluck"],
                },
                {
                "question": "Chocolate milk comes from brown cows.",
                "answers": ["False", "True"],
                },
                {
                "question": "The use of hormones in beef are unsafe",
                "answers": ["False","True"],
                },
                {
                "question": "Cows need this in order to ensure traceability",
                "answers": ["An ear tag","A branding","Ear tattoo"],
                },
                {
                "question": "How many turkeys does Manitoba raise annually?",
                "answers": ["1.6 Million", "600,000", "2 Million", "100,000"],
                },
                {
                "question": "How many turkeys does the average farm raise?",
                "answers": ["6500", "2200", "10000", "500"],
                },
                {
                "question": "From which plant is Canola derived?",
                "answers": ["Rapeseed", "Soybean", "Sunflower", "Olive"],
                },
                {
                "question": "When fully mature, what colour flower does the Canola plant have?",
                "answers": ["Yellow", "Blue", "Purple", "Orange"],
                },
                {
                "question": "Which continent are potatoes indigenous to?",
                "answers": ["South America", "Europe", "Asia", "Africa"],
                },
                {
                "question": "Canada produces 20 million tons of canola each year",
                "answers": ["True", "False"],
                },
                {
                "question": "Of the canola grown in canada, how much is exported?",
                "answers": ["90%", "65%", "70%", "80%"],
                },
                {
                "question": "How much of Canada's grain land was seeded to canola in 2023?",
                "answers": ["25%", "50%", "10%", "65%"],
                },
            ]
        },
    {
            "title": "Test",
            "description": "Questions created by the Agriculture students from 2023-2024 at Assiniboine Community College",
            "enabled": true,
            "questions": [
                {
                "question": "This is a test question",
                "answers": ["yes", "no", "maybe", "so"],
                },
                {
                "question": "How much of Canada's grain land was seeded to canola in 2023?",
                "answers": ["25%", "50%", "10%", "65%"],
                },
            ]
        }]
    }
}else{
    questions = JSON.parse(localStorage.getItem("questions"));
}