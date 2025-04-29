# Use an official TensorFlow runtime as a parent image
FROM tensorflow/tensorflow:latest

# Set the working directory
WORKDIR /app

# Install system dependencies required for Pillow
RUN apt-get update && apt-get install -y \
    python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev

# Copy the requirements file into the container at /app
COPY requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install TensorFlow (ensuring version compatibility)
RUN pip install tensorflow==2.18.0

# Copy the application code
COPY ml_model /app/

# Ensure model files are copied correctly
COPY ml_model/crop_disease_classifier_new_tf.keras /app/
COPY ml_model/crop_disease_classifier_new_fixed.h5 /app/

# Expose port 5000
EXPOSE 5050

# Run the application
CMD ["python", "app.py"]
