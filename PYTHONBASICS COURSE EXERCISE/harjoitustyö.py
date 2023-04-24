#Harjoitustyö - Taneli Manninen (AA3977)

import random

print("Tervehdys! Tämä ohjelma on kahden kortin peli. Tarkoituksena on siis nostaa kaksi korttia pakasta, ja ohjelma kertoo sinulle minkälaisen käden sait!" + "\n")
print("Mahdolliset kädet ovat: Pari, jossa molemmat kortit samaa numeroa. Väri, jossa molemmat kortit ovat samaa maata." + "\n")
print("Voit saada myös parin sekä värin, jos onni on todella myötä. Viimeinen vaihtoehto on pelkät hait, eli ei paria taikka väriä." + "\n")
dumb = input("Paina Enter nostaaksesi kaksi korttia pakasta." + "\n")

filename = "maat.txt"
file = open(filename, "r")
maat = file.readlines()

number1 = random.randrange(1, 13)
number2 = random.randrange(1, 13)
number1_string = str(number1)
number2_string = str(number2)
maa1 = random.choice(maat)
maa2 = random.choice(maat)

if number1 == number2:
    print("Ensimmäinen kortti:", maa1, number1_string)
    print("Toinen kortti:", maa2, number2_string)
    print("Sinulla on pari!")
    
elif maa1 == maa2:
    print("Ensimmäinen kortti:", maa1, number1_string)
    print("Toinen kortti:", maa2, number2_string)
    print("Sinulla on väri!")

elif maa1 == maa2 and number1 == number2:
    print("Ensimmäinen kortti:", maa1, number1_string)
    print("Toinen kortti:", maa2, number2_string)
    print("Onnenpekka! Sinulla on pari, sekä väri!")

else:
    print("Ensimmäinen kortti:", maa1, number1_string)
    print("Toinen kortti:", maa2, number2_string)
    print("Pahus! Kädessäsi on pelkkiä haita!" + "\n")

print("Kiitos pelaamisesta!")
file.close()