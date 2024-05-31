from rest_framework import viewsets, status
from rest_framework.response import Response
import pickle
from django.http import JsonResponse

filepath = r"C:/Users/li848/Downloads/model.sav"
with open(filepath,'rb') as f:
    rg = pickle.load(f)

class UserInputViewSet(viewsets.ViewSet):
    def create(self, request):
        # Extract data from the request
        data = request.data
        JUN = float(data.get('feature1'))
        JUL = float(data.get('feature2'))
        AUG = float(data.get('feature3'))
        SEP = float(data.get('feature4'))
        
        # Define a function to calculate prediction
        def calculate_price(JUN,JUL,AUG,SEP):
            
            # Prepare data for prediction
            data = []
            
            data.append(JUN)
            data.append(JUL)
            data.append(AUG)
            data.append(SEP)

            # Predict price
            pred = rg.predict([data])[0]
            return pred

        # Calculate the prediction
        pred = calculate_price(JUN, JUL, AUG, SEP)

        # Return the prediction to the frontend
        return JsonResponse({'RAIN': pred}, status=status.HTTP_200_OK)