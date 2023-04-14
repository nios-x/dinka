def code(x):
	data=""
	m=1
	for i in x:
		n=str(ord(i))
		if len(n)==1:
			n="000"+n
		elif len(n)==2:
			n="00"+n
		elif len(n)==3:
			n="0"+n
		else:
			m=0 			
		data=data+n
	return data, m
	
def decode(x):
	x=str(x)
	data=""
	a=0
	for i in x[::4]:
		b=chr(int(x[a]+x[a+1]+x[a+2]+x[a+3]))
		a+=4
		data=data+b		
	return data
	 
			
			


print (not("a"<"b"))