import numpy as np
from keras.models import load_model
from keras.models import load_model
import cv2 as cv
from cv2 import WND_PROP_VISIBLE
import os
import time

    
IMG_SIZE = 244
CATEGORIES = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised']

cont = [0, 0, 0, 0, 0, 0, 0]
face_finder = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalface_default.xml')


models = [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None ]

aux_mod = 0
ansr_final = [0, 0]

for category in CATEGORIES:
    for category2 in CATEGORIES:
        if(os.path.exists('./src/IA/saved_model/' + category + '_' + category2 + '.h5')):
            print('--FOUND ' + str(aux_mod) + '--')
            models[aux_mod] = load_model('./src/IA/saved_model/' + category + '_' + category2 + '.h5')
            aux_mod += 1
            
models[aux_mod] = load_model('./src/IA/saved_model/all_emotions.h5')
print('--FOUND ' + str(aux_mod) + '--')

            
INIT_TIME = time.time()
cam = cv.VideoCapture(0)

def most_frequent(aux_ele):
    limit = 4            
    #os.system('cls')
    print(aux_ele)    

    for e in aux_ele:
    
        if aux_ele[1] >= 6:
            return False
        elif aux_ele[3] >= 6:
            return False
        elif aux_ele[6] >= 6:
            return False    
        
        elif aux_ele[4] >= 6:
            print('Neutral')
            aux_ele.pop(4)
            aux_mostF = np.argmax(aux_ele)
            print(aux_ele)
            print(aux_mostF)
            if(aux_mostF == 0):
                return True
            elif(aux_mostF == 1):
                return False
            elif(aux_mostF == 2):
                return True
            elif(aux_mostF == 3):
                return False
            elif(aux_mostF == 4):
                return True
            elif(aux_mostF == 5):
                return False
        
        if aux_ele[0] >= limit:
            return True
        elif aux_ele[2] >= limit:
            return True
        elif aux_ele[5] >= limit:
            return True
        
    return False

def predict(frame):
    aux_ele = [0, 0, 0, 0, 0, 0, 0]

    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    faces = face_finder.detectMultiScale(gray, 1.1, 4)

    if len(faces) == 0:    
        print('--FACE NOT FOUND--')
        
    
    for x,y,w,h in faces:
        roi_gray = gray[y: y+h, x: x+w]
                
        roi_img = cv.cvtColor(roi_gray, cv.COLOR_BGR2RGB)

        if(len(roi_img) == 0):
            pass
                        
        final_img = cv.resize(roi_img, (224, 224))
        final_img = np.expand_dims(final_img, axis=0)
                
        final_img = final_img/255.0
        
        aux_pred = 0
        
        for mod in models:
            if (mod != None):
                pre_pred = np.argmax(mod.predict(final_img))
                
                if aux_pred == 0:
                    if pre_pred == 0:
                        aux_ele[0] += 1
                    elif pre_pred == 1:
                        aux_ele[1] += 1
                elif aux_pred == 1:
                    if pre_pred == 0:
                        aux_ele[0] += 1
                    elif pre_pred == 1:
                        aux_ele[2] += 1
                elif aux_pred == 2:
                    if pre_pred == 0:
                        aux_ele[0] += 1
                    elif pre_pred == 1:
                        aux_ele[3] += 1
                elif aux_pred == 3:
                    if pre_pred == 0:
                        aux_ele[0] += 1
                    elif pre_pred == 1:
                        aux_ele[4] += 1
                elif aux_pred == 4:
                    if pre_pred == 0:
                        aux_ele[0] += 1
                    elif pre_pred == 1:
                        aux_ele[5] += 1
                elif aux_pred == 5:
                    if pre_pred == 0:
                        aux_ele[0] += 1
                    elif pre_pred == 1:
                        aux_ele[6] += 1
                elif aux_pred == 6:
                    if pre_pred == 0:
                        aux_ele[1] += 1
                    elif pre_pred == 1:
                        aux_ele[2] += 1
                elif aux_pred == 7:
                    if pre_pred == 0:
                        aux_ele[1] += 1
                    elif pre_pred == 1:
                        aux_ele[3] += 1
                elif aux_pred == 8:
                    if pre_pred == 0:
                        aux_ele[1] += 1
                    elif pre_pred == 1:
                        aux_ele[4] += 1
                elif aux_pred == 9:
                    if pre_pred == 0:
                        aux_ele[1] += 1
                    elif pre_pred == 1:
                        aux_ele[5] += 1
                elif aux_pred == 10:
                    if pre_pred == 0:
                        aux_ele[1] += 1
                    elif pre_pred == 1:
                        aux_ele[6] += 1
                elif aux_pred == 11:
                    if pre_pred == 0:
                        aux_ele[2] += 1
                    elif pre_pred == 1:
                        aux_ele[3] += 1
                elif aux_pred == 12:
                    if pre_pred == 0:
                        aux_ele[2] += 1
                    elif pre_pred == 1:
                        aux_ele[4] += 1
                elif aux_pred == 13:
                    if pre_pred == 0:
                        aux_ele[2] += 1
                    elif pre_pred == 1:
                        aux_ele[5] += 1
                elif aux_pred == 14:
                    if pre_pred == 0:
                        aux_ele[2] += 1
                    elif pre_pred == 1:
                        aux_ele[6] += 1
                elif aux_pred == 15:
                    if pre_pred == 0:
                        aux_ele[3] += 1
                    elif pre_pred == 1:
                        aux_ele[4] += 1
                elif aux_pred == 16:
                    if pre_pred == 0:
                        aux_ele[3] += 1
                    elif pre_pred == 1:
                        aux_ele[5] += 1
                elif aux_pred == 17:
                    if pre_pred == 0:
                        aux_ele[3] += 1
                    elif pre_pred == 1:
                        aux_ele[6] += 1
                elif aux_pred == 18:
                    if pre_pred == 0:
                        aux_ele[4] += 1
                    elif pre_pred == 1:
                        aux_ele[5] += 1
                elif aux_pred == 19:
                    if pre_pred == 0:
                        aux_ele[4] += 1
                    elif pre_pred == 1:
                        aux_ele[6] += 1
                elif aux_pred == 20:
                    if pre_pred == 0:
                        aux_ele[5] += 1
                    elif pre_pred == 1:
                        aux_ele[6] += 1                
                elif aux_pred == 21:
                    aux_ele[pre_pred] += 1               
                
                print(mod.predict(final_img))
                #os.system('cls')

                aux_pred += 1
            else:
                print('--IS EMPTY--')
        
        
        final_pred = most_frequent(aux_ele)
        return final_pred
        
def main(how_much):
    i = 0
    while True:
        i+=1

        #take frame
        ref, frame = cam.read()

        if frame.any() == None:
            break

        cv.imshow('cam', frame)
        
        #predict            
        ansr = predict(frame)
        
        if ansr != None:
            print(str(ansr))   
            if ansr == True:
                ansr_final[0] += 1
            else:
                ansr_final[1] += 1
        #finished predict    
        
        key = cv.waitKey(1)

        #close window        
        if (cv.getWindowProperty('cam', WND_PROP_VISIBLE) == 0) or (time.time() - INIT_TIME > how_much):   
            print('--------------')
            print('True: ' + str(ansr_final[0]))             
            print('False: ' + str(ansr_final[1]))             
            print('--------------')
            
            if (ansr_final[0] == 0):
                print(False)        
            elif ansr_final[1]/ansr_final[0] < 1.5:
                print(True)
            else:
                print(False)
            
            break
        
main(6.12*60)