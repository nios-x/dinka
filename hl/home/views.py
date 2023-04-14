from genericpath import isfile
from importlib.resources import path
from multiprocessing import context
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
import requests, os, shutil
# Create your views here.
def loginuser(request):
    if request.method=="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(request, 'login.html')
    else:
        return render(request, "login.html")    
     
def logoutuser(request):
    if request.user.is_anonymous:
        return redirect("/login")
    else:   
        logout(request)
        return redirect("/login")

def forgot(request):
    return render(request, 'forgot.html')

def create(request):
    return render(request, 'create.html')

def chat(request, person):
        context={}
        if request.user.is_anonymous:
            return redirect("/login")
        
        elif(request.method=="POST"):
            message = str(request.POST.get('message'))
            
            if person>str(request.user):
                fnam = str(request.user)+str(person)
            else:
                fnam = str((person)+str(request.user))    
            
            if message=="delete_all_chats":
                x = open(f'chats/{fnam}.txt', "w")
                x.close()
            else:
                if os.path.isfile(f'chats/{fnam}.txt'):
                    pass
                else:
                    x = open(f'chats/{fnam}.txt', "w")
                    x.close()
                l= open(f'chats/{fnam}.txt',"a")
                l.write(f"{request.user}: {message}\n")
                l.close()
                return redirect(f"/chat/{person}")
            
            
        else:
            context['key']=person
            if person>str(request.user):
                fnam = str(request.user)+str(person)
            else:
                fnam = str((person)+str(request.user))    
            if os.path.isfile(f'chats/{fnam}.txt'):
                pass
            else:
                x = open(f'chats/{fnam}.txt', "w")
                x.close()
            l= open(f'chats/{fnam}.txt',"r")                
            a=0
            l1=[]
            for i in (l.readlines()):
                i=str(i)
                l1.append(i)
            context['chats']=l1               
            l.close()
            context['noofmessages']=len(l1)
            
            return render(request, 'chat.html', context)
        
        
        
def chatmn(request, person, noofmessages):
            noofmessages=str(noofmessages)
            if person>str(request.user):
                fnam = str(request.user)+str(person)
            else:
                fnam = str((person)+str(request.user))    
            if os.path.isfile(f'chats/{fnam}.txt'):
                pass
            else:
                x = open(f'chats/{fnam}.txt', "w")
                x.close()
            l= open(f'chats/{fnam}.txt',"r")                
            l1=[]
            for i in (l.readlines()):
                i=str(i[:-1])
                l1.append(i)
            if noofmessages=="0":   
                pass      
            else:
                l1=l1[int(noofmessages):]
            return JsonResponse({"messages":l1})        
            
    
    
    
def home(request):
    
        if request.user.is_anonymous:
            return redirect("/login")
        else:
            context={}
            if os.path.isfile(f'chats/cont/{request.user}.txt'):
                d = open(f'chats/cont/{request.user}.txt',"r")
                d=list(d.readlines())
                
                context['key']=d
                    
                
            return render(request, 'home.html', context)
             
def new(request):
    if request.method=="POST":
        em = (request.POST.get('email'))
        em = str(em)
        username = (request.user)
        if os.path.isfile(f'chats/cont/{username}.txt'):
            pass
        else:
            x = open(f'chats/cont/{username}.txt', "w")
            x.close()
            
        d = open(f'chats/cont/{username}.txt',"a")
        l= open(f'chats/cont/{username}.txt',"r")
        l1=[]
        for i in (l.readlines()):
            i=str(i)
            l1.append(i)
        n=0  
        for i in l1:
            if n==0:
                if em in i:
                    n=1
        if n==0:
            d.write(em+"\n")
                
            
        d.close()
        l.close()                      
        
    return render(request, 'new.html')