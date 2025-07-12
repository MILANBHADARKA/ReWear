import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
import os

IMG_SIZE = 224
BATCH_SIZE = 16
NUM_CLASSES = 4 


DATA_DIR = "dataset/genre"
EPOCHS = 5


datagen = ImageDataGenerator(validation_split=0.2, rescale=1./255)

train_gen = datagen.flow_from_directory(DATA_DIR,
                                        target_size=(IMG_SIZE, IMG_SIZE),
                                        batch_size=BATCH_SIZE,
                                        class_mode='categorical',
                                        subset='training')

val_gen = datagen.flow_from_directory(DATA_DIR,
                                      target_size=(IMG_SIZE, IMG_SIZE),
                                      batch_size=BATCH_SIZE,
                                      class_mode='categorical',
                                      subset='validation')


base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
base_model.trainable = False


x = GlobalAveragePooling2D()(base_model.output)
output = Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=output)

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS)

os.makedirs("models", exist_ok=True)
model.save("models/genre_classifier.h5")

label_map = train_gen.class_indices
with open("models/genre_labels.txt", "w") as f:
    for label, idx in label_map.items():
        f.write(f"{idx},{label}\n")

print(" Genre classifier model saved.")
