# rewear/ml/train_type_classifier.py
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers import Adam

# Paths
DATA_DIR = "data/type"
IMG_SIZE = (128, 128)
BATCH_SIZE = 16
EPOCHS = 5  # increase if you have more time/data

# Data augmentation
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_gen = datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset='training'
)

val_gen = datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset='validation'
)

# Build model
base_model = MobileNetV2(include_top=False, input_shape=(*IMG_SIZE, 3), pooling='avg', weights='imagenet')
base_model.trainable = False  # freeze

model = models.Sequential([
    base_model,
    layers.Dense(128, activation='relu'),
    layers.Dense(train_gen.num_classes, activation='softmax')
])

model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])

# Train
model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS)

# Save
model.save("rewear/ml/type_model.h5")
print("✅ Type classifier saved as type_model.h5")
