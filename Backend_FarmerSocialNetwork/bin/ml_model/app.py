#from flask import Flask, request, jsonify
#from flask_cors import CORS
#import tensorflow as tf
#import numpy as np
#from PIL import Image
#import io
#
#app = Flask(__name__)
#CORS(app)
#
## Load the updated model
#model = tf.keras.models.load_model('/app/crop_disease_classifier_new_tf.keras')
#
#
## Class labels
#class_labels = {
#    0: 'Brownspot',
#    1: 'Common_Rust',
#    2: 'Gray_Leaf_Spot',
#    3: 'Healthy Wheat',
#    4: 'Healthy cotton',
#    5: 'Leaf Curl',
#    6: 'Rice Blast',
#    7: 'Wheat Brown Leaf',
#    8: 'Red Cotton Bug',
#    9: 'Thrips on Cotton'
#}
#
#@app.route('/predict', methods=['POST'])
#def predict():
#    file = request.files['file']
#    img = Image.open(io.BytesIO(file.read()))
#    img = img.resize((224, 224))
#    img_array = np.array(img) / 255.0
#    img_array = np.expand_dims(img_array, axis=0)
#
#    # Make prediction
#    prediction = model.predict(img_array)
#    predicted_class = np.argmax(prediction, axis=1)[0]
#    class_probabilities = prediction[0]
#
#    response = {
#        'predicted_class': class_labels[predicted_class],
#        'class_probabilities': class_probabilities.tolist()
#    }
#    return jsonify(response)
#
#if __name__ == '__main__':
#    app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image, UnidentifiedImageError
import io

app = Flask(__name__)
CORS(app)

# Load the updated model
model = tf.keras.models.load_model('/app/crop_disease_classifier_new_tf.keras')

# Define image dimensions
IMG_HEIGHT = 224
IMG_WIDTH = 224

# Class labels
class_labels = {
    0: 'Brownspot',
    1: 'Common_Rust',
    2: 'Gray_Leaf_Spot',
    3: 'Healthy Wheat',
    4: 'Healthy cotton',
    5: 'Leaf Curl',
    6: 'Rice Blast',
    7: 'Wheat Brown Leaf',
    8: 'Red Cotton Bug',
    9: 'Thrips on Cotton'
}

def preprocess_image(image):
    """Preprocess the image to ensure proper format for model prediction."""
    try:
        # Ensure the image is opened correctly
        img = Image.open(io.BytesIO(image))

        # Convert RGBA/grayscale images to RGB
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Resize image dynamically while maintaining aspect ratio
        img = img.resize((IMG_WIDTH, IMG_HEIGHT))

        # Convert to numpy array and normalize
        img_array = np.array(img) / 255.0

        # Ensure image has the correct shape (batch_size, 224, 224, 3)
        img_array = np.expand_dims(img_array, axis=0)

        return img_array
    except UnidentifiedImageError:
        return None

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file'].read()
    img_array = preprocess_image(file)

    if img_array is None:
        return jsonify({'error': 'Invalid image format'}), 400

    # Make prediction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    class_probabilities = prediction[0].tolist()

    response = {
        'predicted_class': class_labels[predicted_class],
        'class_probabilities': class_probabilities
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)

