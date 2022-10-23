from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from transformers import pipeline

# load tokenizer
tokenizer = AutoTokenizer.from_pretrained("./saved_model")

# load emotion classifier
model = AutoModelForSequenceClassification.from_pretrained("./saved_model")

# define pipeline
classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
print(classifier("BAD TERRIBLE!"))

# define pipeline
classifier = pipeline(
    "sentiment-analysis", model="michellejieli/emotion_text_classifier"
)
print(classifier("I love this!"))
