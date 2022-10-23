import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import torch
from transformers import Trainer, TrainingArguments
import torch
from datasets import load_metric
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification

def read_df_split(split_dir):
    """Reads the data from path split"""
    df = pd.read_csv(split_dir)
    # remove 'non-neutral' labels
    df = df[df["label"] != "non-neutral"]
    texts = df["text"].tolist()
    labels = df["label"].tolist()
    # convert labels to integers
    label2id = {label: i for i, label in enumerate(np.unique(labels))}
    labels = [label2id[label] for label in labels]
    return texts, labels


train_texts, train_labels = read_df_split("./friends_cleaned.csv")

# split into train and validation set
train_texts, val_texts, train_labels, val_labels = train_test_split(
    train_texts, train_labels, test_size=0.2
)

# load the DistilBERT tokenizer
model_name = "j-hartmann/emotion-english-distilroberta-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
# tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased')

# tokenize the texts
train_encodings = tokenizer(train_texts, truncation=True, padding=True)
val_encodings = tokenizer(val_texts, truncation=True, padding=True)


class FriendsDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item["labels"] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)


train_dataset = FriendsDataset(train_encodings, train_labels)
val_dataset = FriendsDataset(val_encodings, val_labels)

training_args = TrainingArguments(
    output_dir="./results",  # output directory
    evaluation_strategy="epoch",  # evaluate each epoch
    num_train_epochs=3,  # total number of training epochs
    per_device_train_batch_size=16,  # batch size per device during training
    per_device_eval_batch_size=64,  # batch size for evaluation
    warmup_steps=500,  # number of warmup steps for learning rate scheduler
    weight_decay=0.01,  # strength of weight decay
    logging_dir="./logs",  # directory for storing logs
    logging_steps=10,
)

model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=7)

# load the metric
metric = load_metric("accuracy")


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)


trainer = Trainer(
    model=model,  # the instantiated 🤗 Transformers model to be trained
    args=training_args,  # training arguments, defined above
    train_dataset=train_dataset,  # training dataset
    eval_dataset=val_dataset,  # evaluation dataset
    compute_metrics=compute_metrics,  # the callback that computes metrics of interest
)

trainer.train()

# save the pretrained model
tokenizer.save_pretrained("./saved_model")
model.save_pretrained("./saved_model")
