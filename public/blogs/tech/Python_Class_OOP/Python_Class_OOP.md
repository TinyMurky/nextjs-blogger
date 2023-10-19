---
title: Python Class /OOP 筆記
description: 此篇作為python class/OOP 的筆記，因為我一直不清楚python class的操作方法，因此紀錄下來以便日後查找。
date: '2023-03-18T02:40:36.024Z'
tag: 'Python'
readTime: 35
cover: './images/1__JOoga42iuLkWxj__tKIzYYg.jpeg'
slug: /@tinymurky/python-class-oop-%E7%AD%86%E8%A8%98-7298e9a06cf1
---

### 前言

此篇作為python class/OOP 的筆記，因為我一直不清楚python class的操作方法，因此紀錄下來以便日後查找。

主要內容為以下Youtube影片與Github的內容， 影片作者為[Corey Schafer](https://www.youtube.com/@coreyms)

*   Youtube: [Python OOP Tutorials — Working with Classes](https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc)
*   Github: [CoreyMSchafer / **code\_snippets**](https://github.com/CoreyMSchafer/code_snippets/tree/master/Object-Oriented)

![](./images/1__JOoga42iuLkWxj__tKIzYYg.jpeg)

目錄  
1\. [Classes and Instances](#c05b)  
2\. [Class Variables](#90c3)  
3\. [Classmethods and Staticmethods](#0d9a)  
4\. [Inheritance - Creating Subclasses](#8faa)  
5\. [Special (Magic/Dunder) Methods 其他雙底線methods](#7a1c)  
6\. [@property, getter, setter and deleter](#0fb1)

### 1\. Classes and Instances

> 在class中：

> 1\. data叫作attribute

> 2\. function叫作method

> 3\. instance指用class去創造一個物件，也指被class狀造的物件

#### Instance

從以下的程式碼中可以看到，如果單純建立空的Class Employee，並使用class 去instance一個object。這個object可以直接在class外部用object名稱去建立object裏面的值。

```Python
class Employee:  
    pass \# 使用pass避免error  
  
emp\_1 = Employee()  
emp\_2 = Employee()  
  
emp\_1.first = "Tiny"  
emp\_1.last = "Murky"  
emp\_1.email = "tiny.murky@company.com"  
emp\_1.pay = 50000  
  
print(emp\_1.email)   
\# 輸出： tiny.murky@company.com
```
但是上述的方法很麻煩，所以可以使用class建立function \_\_init\_\_幫我們初始化class，用法等同於其他語言的constructor。

需要注意的是class中的function第一個argument一定要放self(變數名稱可以自己取，但是儘量是self)。 self的意思是指instance自己，舉例來說如果建立emp\_1 = Employee()時，\_\_init\_\_的self就會是emp\_1，也就是指\_\_init\_\_(emp\_1)的意思。

以下程式碼可以看出 Employee.\_\_init\_\_(emp\_1) 和 emp\_1.\_\_init\_\_()是相同的產出。但是Employee.\_\_init\_\_()卻回傳少一個值self，這個self就是指instance，例如emp\_1。

```Python
class Employee:  
    def \_\_init\_\_(self):  
        pass  
  
emp\_1 = Employee()  
print(Employee.\_\_init\_\_(emp\_1))  
\# 輸出： None  
print(emp\_1.\_\_init\_\_())  
\# 輸出： None  
  
print(Employee.\_\_init\_\_())  
\# 輸出： TypeError: \_\_init\_\_() missing 1 required positional argument: 'self'
```
有了\_\_init\_\_()之後就可以如下方的程式碼，直接在instance class時把argument放進\_\_init\_\_中，由於self就是instance，效果等同於從class外面一個一個建立instance的attribute。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first \# 同等emp\_1.first = "Tiny"  
        self.last = last   \# 同等emp\_1.last = "Murky"  
        self.pay = pay     \# 同等emp\_1.pay = 50000  
        self.email = f"{self.first}{self.last}@company.com"  
  
first = "Tiny"  
last = "Murky"  
pay = 50000  
emp\_1 = Employee(first, last, pay)  
  
print(emp\_1.email)  
  
\# 輸出： TinyMurky@company.com  
``` 

#### Method

如果要在class中創method，記得在argument中放入self，來接取instance自己，如果僅有fullname()這樣子的話會出現訊息:TypeError: fullname() takes 0 positional arguments but 1 was given，代表沒有argument去接收instance自己。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
    def fullname(self):  
        return f"{self.first} {self.last}"  
  
print(emp\_1.fullname())        \# 輸出 Tiny Murky  
print(Employee.fullname(emp\_1))\# 輸出 Tiny Murky
```

### 2\. Class Variables

如果想要建立一個所有Instance共用的值，可以直接寫在整個class的最上方，instance要使用共用值時可以直接用self取出

```Python
class Employee:  
    raise\_amt = 1.05  \# 共用值放最上面  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
  
    def apply\_raise(self):  
        self.pay = int(self.pay \* self.raise\_amt)  \# 使用self.raise\_amt取出值  
``` 
  
  

從以下程式碼中可以看出，如果從Class中直接更改raise\_amt，其他instance也會一起被更改。
```Python
print(emp\_1.pay)         \# 輸出 10,000  
emp\_1.apply\_raise()  
print(emp\_1.pay)         \# 輸出 10,500  
  
Employee.raise\_amt = 1.1  
  
emp\_1.pay = 10000  
print(emp\_1.pay)         \# 輸出 10,000  
emp\_1.apply\_raise()  
print(emp\_1.pay)         \# 輸出 11,000
```

但如果是在instance單獨更改的話，則只會影響到該instance

```Python
emp\_1 = Employee("Tiny", "Murky", 10000)  
emp\_2 = Employee("Test", "User", 10000)  
  
print(emp\_1.pay)      \# 輸出 10,000  
emp\_1.apply\_raise()  
print(emp\_1.pay)      \# 輸出 10,500  
  
emp\_1.raise\_amt = 1.1  
  
print(emp\_2.pay)      \# 輸出 10,000  
emp\_2.apply\_raise()  
print(emp\_2.pay)      \# 輸出 10,500
```

原因可以從\_\_dict\_\_中觀察，在更改emp\_1=raise\_amt之前，可以觀察到emp\_1內部沒有raise\_amt，他是取用Class Employee的raise\_amt 1.05。在emp\_1= raise\_amt之後可以看見emp\_1內部出現自己的raise\_amt 1.1，優先使用自己的raise\_amt，此外Class Employee的raise\_amt還是保持在1.05

```Python
emp\_1 = Employee("Tiny", "Murky", 10000)  
  
print(emp\_1.\_\_dict\_\_)  
\# {'first': 'Tiny', 'last': 'Murky', 'pay': 10500, 'email': 'TinyMurky@company.com'}  
print(Employee.\_\_dict\_\_)  
\# {'\_\_module\_\_': '\_\_main\_\_', 'raise\_amt': 1.05, '\_\_init\_\_': <function Employee.\_\_init\_\_ at 0x7f5f6920c280>, 'fullname': <function Employee.fullname   
\# at 0x7f5f6920c310>, 'apply\_raise': <function Employee.apply\_raise at 0x7f5f6920c3a0>, '\_\_dict\_\_': <attribute '\_\_dict\_\_' of 'Employee' objects>, '\_  
\# \_weakref\_\_': <attribute '\_\_weakref\_\_' of 'Employee' objects>, '\_\_doc\_\_': None}  
  
emp\_1.raise\_amt = 1.1  
  
print(emp\_1.\_\_dict\_\_)  
\# {'first': 'Tiny', 'last': 'Murky', 'pay': 10500, 'email': 'TinyMurky@company.com',  
\#  'raise\_amt': 1.1}  
print(Employee.\_\_dict\_\_)  
\# {'\_\_module\_\_': '\_\_main\_\_', 'raise\_amt': 1.05, '\_\_init\_\_': <function Employee.\_\_init\_\_ at 0x7f5f6920c280>, 'fullname': <function Employee.fullname   
\# at 0x7f5f6920c310>, 'apply\_raise': <function Employee.apply\_raise at 0x7f5f6920c3a0>, '\_\_dict\_\_': <attribute '\_\_dict\_\_' of 'Employee' objects>, '\_  
\# \_weakref\_\_': <attribute '\_\_weakref\_\_' of 'Employee' objects>, '\_\_doc\_\_': None}
```

另外還有一個神奇的用法，可以使用className.attribute的方法在class裏面控制attribute，每instance一次物件，attribute的數值都會變更，但是attribute又在各instance中保持一致。

```Python
class Employee:  
    raise\_amt = 1.05  
    how\_many\_emplyee = 0  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
        Employee.how\_many\_emplyee += 1 \# 請看此行  
  
emp\_1 = Employee("Tiny", "Murky", 10000)  
print(emp\_1.how\_many\_emplyee)            \# 輸出：1  
print(Employee.how\_many\_emplyee)         \# 輸出：1  
  
emp\_2 = Employee("Test", "User", 10000)  
print(emp\_1.how\_many\_emplyee)            \# 輸出：2  
print(emp\_2.how\_many\_emplyee)            \# 輸出：2  
print(Employee.how\_many\_emplyee)         \# 輸出：2  
```


### 3\. Classmethods and Staticmethods

#### Classmethods

如果在Class中的function上方加入 **@classmethod** 的decoration，可以將function變成class method，會讓function的第一個argument直接輸入Class自己（如：Employee）而不是instance。

```Python
class Employee:  
    raise\_amt = 1.05  
    how\_many\_emplyee = 0  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
        Employee.how\_many\_emplyee += 1  
  
 @classmethod  
    def set\_raise\_amount(cls, amount): \# set\_raise\_amount是class method  
        cls.raise\_amt = amount         \# 此行等同於Employee.raise\_amd = amount
```

以下程式碼表示，在使用 Employee.set\_raise\_amount(1.1)之後，Class Employee內部的raise\_amt改成1.1，並在所有的instance上同步。

```Python
emp\_1 = Employee("Tiny", "Murky", 10000)  
emp\_2 = Employee("Test", "User", 10000)  
  
print(Employee.raise\_amt)     \# 輸出： 1.05  
print(emp\_1.raise\_amt)        \# 輸出： 1.05  
print(emp\_2.raise\_amt)        \# 輸出： 1.05  
  
Employee.set\_raise\_amount(1.1)  
  
print(Employee.raise\_amt)     \# 輸出： 1.1  
print(emp\_1.raise\_amt)        \# 輸出： 1.1  
print(emp\_2.raise\_amt)        \# 輸出： 1.1
```

以下是可以但是不太好的寫法，直接在instance上呼叫classmethod也可以直接改到Class的值並影響到所有instance，要注意此方法並無會為instance增加新的raise\_amt，而是直接更改Class。

```Python
emp\_1.set\_raise\_amount(2.2)  
  
print(Employee.raise\_amt)    \# 輸出： 2.2  
print(emp\_1.raise\_amt)       \# 輸出： 2.2  
  
print(emp\_1.\_\_dict\_\_)  \# 可以看出emp\_1.set\_raise\_amount並不會影響emp\_1  
\# 輸出： {'first': 'Tiny', 'last': 'Murky',   
\# 'pay': 10000, 'email': 'TinyMurky@company.com'}  
  
print(emp\_2.raise\_amt)       \# 輸出： 2.2
```

#### 利用Classmethod當作替代的\_\_init\_\_()

classmethod有另一個用法是當作\_\_init\_\_來用，例如今天員工的資料都是用”-”來區分，可以建立一個classmethod Employee.from\_string()，這個函式吃Cls和string兩個argument，並會回傳一個cls(first, last, pay)，又因為cls就是Class本身，所以效果等同於回傳一個Employee(first, last, pay)，直接instance一個物件。

```Python
class Employee:  
    raise\_amt = 1.05  
    how\_many\_emplyee = 0  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
        Employee.how\_many\_emplyee += 1  
  
 @classmethod  
    def from\_string(cls, emp\_str):  
        first, last, pay = emp\_str.split("-")  
        return cls(first, last, pay)  
        \# cls就是Employee，所以等同Employee(first,last,pay)  
  
emp\_str\_1 = "Tiny-Murky-10000"  
  
emp\_1 = Employee.from\_string(emp\_str\_1)  
print(emp\_1.email) \# 輸出 TinyMurky@company.com  
```
  

#### Staticmethod

Static method是Class中的一種function，他不會接收instance或是class當作argument，所以如果一個function中沒有使用到self或是class，可以盡可能的把他寫成static method

使用static method的時候要在function上面加上@staticmethod 的decoration。

以下的isWeekend輸入星期數，回傳是不是週末，不需要使用任何8faa的self和cls(代表function不需要用到instance或class本身)，可以從class中直接叫出來使用，也可以從instance中叫出來。

```Python
class Employee:  
    raise\_amt = 1.05  
    how\_many\_emplyee = 0  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
        Employee.how\_many\_emplyee += 1  
  
  
 @staticmethod  
    def isWeekend(day):  \# 未使用self和cls的function  
        if day == 5 or day == 6:  
            return True  
        return False  
  
print(Employee.isWeekend(6))  \# 輸出 True  
print(Employee.isWeekend(4))  \# 輸出 False  
```
  
\# 當然也可以直接從instance叫出來用  

```Python
emp\_1 = Employee("Tiny", "Murky", 10000)  
print(emp\_1.isWeekend(6))     \# 輸出 True
```


### 4\. Inheritance — Creating Subclasses

Inheritance（繼承）可以從一個parent class身上得到它所有的attribute和method，並另外加自己的attribute和method變成一個新的class，這樣子在管理上比較方便，不用重複寫很多一樣的code。

以下為本次使用的parent class

```Python
class Employee:  
    raise\_amt = 1.05  
    how\_many\_emplyee = 0  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
        Employee.how\_many\_emplyee += 1  
  
    def fullname(self):  
        return f"{self.first} {self.last}"  
  
    def apply\_raise(self):  
        self.pay = int(self.pay \* self.raise\_amt)
```

接著建立一個class，在class的小括號裏面放上想要從哪個parent繼承。可以從下面的程式碼看到，Developer裏面沒有任何自己的參數，但是卻可以直接instance，這是因為argument會依照繼承鍊（稱為：method resolution order）向parent class 提供值，最後成功instance

```Python
class Developer(Employee):  
    pass  
  
dev1 = Developer("Tiny", "Murky", 10000)  
print(dev1.email) \#  輸出 TinyMurky@company.com
```

method resolution order可以從help(ClassName)中看到，如果要看到Develope的order，可以使用print(help(Developer))

以下為Method resolution order:

1.  Developer
2.  Employee
3.  builtins.object

如果找不到特定的function就會沿著Method resolution order尋找是不是有同名的function，像是在instance的時候，Developer裏面沒有\_\_init\_\_()，因此使用parent class中的function。也就是說在child class當中如果相同名稱的function就會覆寫過parent class。

```Python
print(help(Developer))  
"""  
class Developer(Employee)  
 |  Developer(first, last, pay)  
 |    
 |  Method resolution order:  
 |      Developer  
 |      Employee  
 |      builtins.object  
 |    
 |  Methods inherited from Employee:  
 |    
 |  \_\_init\_\_(self, first, last, pay)  
 |      Initialize self.  See help(type(self)) for accurate signature.  
 |    
 |  apply\_raise(self)  
 |    
 |  fullname(self)  
 |    
 |  ----------------------------------------------------------------------  
 |  Data descriptors inherited from Employee:  
 |    
 |  \_\_dict\_\_  
 |      dictionary for instance variables (if defined)  
 |    
 |  \_\_weakref\_\_  
 |      list of weak references to the object (if defined)  
 |    
 |  ----------------------------------------------------------------------
```
如果子class想要有自己的\_\_init\_\_，可以使用下面的寫法，在Developer Class的\_\_init\_\_當中，我們先放入Parent Class 需要使用的 first, last, pay，接著放入Developer自己的argument “program\_language”代表程序員會使用哪種語言。

接著把 first, last, pay放到Parent Class的\_\_init\_\_來完成instance，可以使用super()代表Employee class，super的小括號內可以是空白，或是填上(Developer, self)，兩種方法都可以，但要注意Developer是子class名稱不是parent class。也可以使用parent class . \_\_init\_\_，但是記得在\_\_init\_\_中放入self。

接著把parent class所需以外的argument 放入attribute當中，就可以在parent class既有的attribute外克制化自己的初始值。

從下面的程式碼可以看見，屬於Employee的email和屬於Developer的program\_language都已經成功建立。

```Python
class Developer(Employee):  
    def \_\_init\_\_(self, first, last, pay, program\_language):  
        su9per(Developer, self).\_\_init\_\_(first, last, pay)  
        \# super().\_\_init\_\_(first, last, pay) 也可以  
        \# Employee.\_\_init\_\_(self, first, last, pay) 也可以  
        self.program\_language = program\_language  
  
  
dev1 = Developer("Tiny", "Murky", 10000, "python")  
print(dev1.email)             \# 輸出 TinyMurky@company.com  
print(dev1.program\_language)  \# 輸出 python
```

除了\_\_init\_\_之外，我們也可以創造Developer自己的method或是覆寫Employer相同的method。

從下方的fullname可以看到覆寫Employee已經有的method，先用super().fullname來呼叫Employee已經寫好的method，回傳全名。在他後面加上使用的程式語言self.program\_language後回傳，變成自己的fullname method。

也可以如一般的class一樣自己寫method，像是say\_hi是Developer獨有的method，parent class不會有此method。

```Python
class Developer(Employee):  
    def \_\_init\_\_(self, first, last, pay, program\_language):  
        super(Developer, self).\_\_init\_\_(first, last, pay)  
        \# super().\_\_init\_\_(first, last, pay) 也可以  
        \# Employee.\_\_init\_\_(self, first, last, pay) 也可以  
        self.program\_language = program\_language  
  
    def fullname(self): \# 覆寫method  
        return f"{super().fullname()} used {self.program\_language}"  
  
    def say\_hi(self):   \# 自創method  
        return f"{self.last} said hi"  
  
  
dev1 = Developer("Tiny", "Murky", 10000, "python")  
  
print(dev1.fullname())  \# Tiny Murky used python  
print(dev1.say\_hi())    \# Murky said hi  
print(dev1.\_\_dict\_\_)    \# 看一下Developer有哪些參數  
\# {'first': 'Tiny', 'last': 'Murky', 'pay': 10000,   
\# 'email': 'TinyMurky@company.com', 'program\_language  
\# ': 'python'}
```

#### isinstance() and issubclass()

使用isinstance()可以知道一個物件是不是某個class的instance，下方的dev1是從Developer instance，Dveloper繼承Employee，所以dev1是Dveloper和Employee的 instance，但卻不是同樣繼承Employee的Manager的instance。

使用issubclass()可以知道一個class是否繼承自另一個class，如Developer和Manager都是Employee的subclass，但卻互不為對方的subclass。

```Python
class Manager(Employee):  
    pass  
  
dev1 = Developer("Tiny", "Murky", 10000, "python")  
  
print(  
    isinstance(dev1, Developer),      \# True  
    isinstance(dev1, Employee),       \# True  
    isinstance(dev1, Manager),        \# False  
)  
  
print(  
    issubclass(Developer, Employee),  \# True  
    issubclass(Developer, Manager),   \# False   
    issubclass(Manager, Manager),     \# True  
)
```


### 5\. Special (Magic/Dunder) Methods 其他雙底線methods

python class 除了\_\_init\_\_()以外還有許多有雙底線的methods，可以參考此[Python doc](https://docs.python.org/3/reference/datamodel.html#special-method-names)。

這些雙底線的功能可以對應到特定的python預設的 function如len(), str(), repr(), del()。雙底線methods可以讓我們自訂一個class的instance被當作預設function的參數時應該會表現的動作。

#### \_\_repr\_\_()與\_\_str\_\_()

python當中設有repr()與str()兩個function，repr()是印出資訊給Developer看，str()則是印出資訊給使用者看。

repl()內的資訊需要寫成像是python程式碼在instance一個class時會長的樣子，這個值如果直接傳給eval()就可以當作程式碼執行。str()則是直接回傳想要給使用者什麼樣的資訊，重點為可讀性。

而\_\_repr\_\_()與\_\_str\_\_()用來應對當instance被當作repr()與str()的參數時，自訂化回傳的資訊。

以下程式碼可以看到如果只設定一個\_\_repr\_\_()，使用print()或是repr()都可以回傳\_\_repr\_\_()的內容。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
    def \_\_repr\_\_(self):  \# for developer  
        return f"Employee('{self.first}', '{self.last}', {self.pay})"  
  
emp\_1 = Employee("Tiny", "Murky", 10000)  
print(emp\_1)             \# 輸出： Employee('Tiny', 'Murky', 10000)  
print(repr(emp\_1))       \# 輸出： Employee('Tiny', 'Murky', 10000)  
print(emp\_1.\_\_repr\_\_())  \# 輸出： Employee('Tiny', 'Murky', 10000)
```

但如果增加\_\_str\_\_()，print()則會回傳\_\_str\_\_()的設定值，str()也會回傳相同值。

```Python
class Employee:  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
    def \_\_repr\_\_(self):  \# for developer  
        return f"Employee('{self.first}', '{self.last}', {self.pay})"  
  
    def \_\_str\_\_(self):  \# for end user  
        return f"{self.last}'s email is: '{self.email}'"  
  
  
emp\_1 = Employee("Tiny", "Murky", 10000)  
  
print(emp\_1)           #輸出： Murky's email is: 'TinyMurky@company.com'  
print(repr(emp\_1))     \# 輸出： Employee('Tiny', 'Murky', 10000)  
print(emp\_1.\_\_repr\_\_())\# 輸出： Employee('Tiny', 'Murky', 10000)  
  
print(str(emp\_1))      #輸出： Murky's email is: 'TinyMurky@company.com'  
print(emp\_1.\_\_str\_\_()) #輸出： Murky's email is: 'TinyMurky@company.com'
```

#### \_\_add\_\_()

Python在使用 + 號時，其實是呼叫物件的\_\_add\_\_() method。可以看到以下程式碼當中數字相加等同於int.\_\_add\_\_()，文字相加等同於str.\_\_add\_\_()

```Python
print(1 + 2)                        \# 輸出：3  
print(int.\_\_add\_\_(1, 2))            \# 輸出：3  
print("Tiny " + "Murky")            \# 輸出：Tiny Murky  
print(str.\_\_add\_\_("Tiny ", "Murky"))\# 輸出：Tiny Murky
```

因此我們也可以增加\_\_add\_\_()讓Class可以使用 + 號。如下方的程式碼中\_\_add\_\_()將self和另一個Employee的pay加在一起，就可以直接回傳兩人的薪水相加。還可以使用isinstance來檢查+ 號後的另一個是否為Employee type。

```Python
class Employee:  
  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
  
    def \_\_add\_\_(self, other\_guy):  
        \# add salary together  
        if isinstance(other\_guy, Employee):  
            return self.pay + other\_guy.pay  
        return NotImplemented  \# 如果不是Employee則會出現error  
  
emp\_1 = Employee("Tiny", "Murky", 10000)  
emp\_2 = Employee("Test", "User", 20000)  
print(emp\_1 + emp\_2) #輸出 30000
```

#### \_\_len\_\_()

Python在使用len() function的時候會呼叫物件的\_\_len\_\_()，從以下程式碼可以觀察len(“test”)與”test”.\_\_len\_\_()都會回傳”test”的長度4。

```Python
print(len("test"))       \# 輸出：4  
print("test".\_\_len\_\_())  \# 輸出：4
```

可以像下方程式碼利用\_\_len\_\_()回傳Employee.fullname()的長度。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last, pay):  
        self.first = first  
        self.last = last  
        self.pay = pay  
        self.email = f"{self.first}{self.last}@company.com"  
  
    def fullname(self):  
        return f"{self.first} {self.last}"  
  
    def \_\_len\_\_(self):  
        return len(self.fullname())  
  
  
emp\_1 = Employee("Tiny", "Murky", 10000)  
  
print("The length of 'Tiny Murky' is: ", len(emp\_1))   
#輸出： The length of 'Tiny Murky' is:  10
```


### 6\. @property, getter, setter and deleter

假設我們有下列的程式碼，如果要取用emp\_1的email就要使用emp\_1.email這個寫法。但是如果今天想要保護email attribute不希望直接讓別人取用，就需要寫一個get\_email(self) 讓別人用method的方法得到email的值。但是可能別的程式碼裏面都已經寫好使用emp\_1.email寫法，如果要全部都改成get\_email會是一件大工程。我們可以使用@property的寫法來避免大量更改。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last):  
        self.first = first  
        self.last = last  
        self.email = f"{self.first}.{self.last}@company.com"  
emp\_1 = Employee("Tiny", "Smith")

@ property 提供 getter, setter 和deleter 3個功能。
```

#### getter

getter的功能是當取用class的一個method時可以不用打小括號，如下方的程式碼所顯示，先把\_\_init\_\_的self.email改成self.\_email做保護，再另寫一個method叫作email(self)回傳self.\_email，在method上方加上@ property，就可以直接使用emp\_1.email呼叫email(self)，不需要加小括號。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last):  
        self.first = first  
        self.last = last  
        self.\_email = f"{self.first}.{self.last}@company.com"  
  
 @property  
    def email(self):  
        return self.\_email  
  
emp\_1 = Employee("Tiny", "Smith")  
print(emp\_1.email) \# 輸出： Tiny.Smith@company.com
```

#### setter

使用getter之後就不能直接將email用等號的方法改變內容（ex emp\_1.email = other.email@company.com），因此我們還需要一個setter。

setter讓我們可以用 “= 號” 來改變emp\_1.email的值，使用時需要些建立getter，然後再寫一個與getter同樣名稱的method，method上面需要加上@ getter\_name.setter 的字段，才能啟用setter的設定。在setter中寫上要如何處理 = 號 後面的值，並需要有一個argument將其接住。

完成後變可以使用emp\_1.email = “other.email@company.com”來改變self.\_email的值，並使用getter回傳。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last):  
        self.first = first  
        self.last = last  
        self.\_email = f"{self.first}.{self.last}@company.com"  
  
 @property  
    def email(self):  
        return self.\_email  
  
 @email.setter  
    def email(self, new\_email):  
        self.\_email = new\_email  
  
emp\_1 = Employee("Tiny", "Smith")  
print(emp\_1.email)                      \# 輸出： Tiny.Smith@company.com  
emp\_1.email = "other.email@company.com"
print(emp\_1.email)                      \# 輸出： other.email@company.com
```

#### deleter

若想要刪除emp\_1.email的值可以設立deleter，並使用del emp\_1.email來刪除（注意不是del()，而是單純的del，沒有小括號）

設立方法需要先建立與getter同名的method，上面加上@getter\_name.deleter字段，並在method內部設計如何將self.\_email清空。

使用時呼叫 del emp\_1.email，就可以將self.\_email清空成None。

```Python
class Employee:  
    def \_\_init\_\_(self, first, last):  
        self.first = first  
        self.last = last  
        self.\_email = f"{self.first}.{self.last}@company.com"  
  
 @property  
    def email(self):  
        return self.\_email  
  
 @email.setter  
    def email(self, new\_email):  
        self.\_email = new\_email  
  
 @email.deleter  
    def email(self):  
        print("Email Deleted!")  
        self.\_email = None  
  
print(emp\_1.email)    \# 輸出： Tiny.Smith@company.com  
del emp\_1.email       \# 輸出： Email Deleted!  
print(emp\_1.email)    \# 輸出： None
```


### 結語

這篇文章撰寫的時間比預計的高出很多，希望有幫助到您，謝謝您的閱讀！