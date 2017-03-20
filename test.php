<!DOCTYPE html>
<html>
	<head>
	  <title>OOP in PHP</title>
	  <meta charset="UTF-8">
	</head>
	<body>
      <p>
<?php 
        class Dog 
        {
            public $numLegs = 4;
            public $name;
            const retry = '123';
            
            public function __construct($name, $paws = 4) {
                $this->name = $name;
                $this->paws = $paws;  // создание свойства 
            }
            
            public function bark() {
                return 'Woof!';
            }
            
            final public function greet() {
                return $this->name;
            } 

            public static function aport() {
                return "brings the stick";
            }
        }
        
        $dog1 = new Dog("Barker"); // creating a new object
        $dog2 = new Dog("Amigo");
        
        // echo $dog2->greet(); // вызов метода обьекта
        // echo $dog2->paws; // вывод публичного свойства обьекта
        // echo(is_a($dog1, "Dog")); // checking is $dog1 an object "Dog"
        // echo(property_exists($dog1, "name")); //cheking has object $dog1 property $name
        // echo(method_exists($dog1, "bark")); //cheking does method bark() included in object $dog1
        
        class Mops extends Dog 
        {
            public $head = ">>0-0<<";
            const retry = '123';
            public function __construct($head) {
                $this->head = $head; 
            }

            public function bark() { //overwriting parents method
                return 'Tyaf!';
            }

            // public function greet() {
            //   error: cannot override FINAL method
            // } 



        }

        $mops1 = new Mops("vasya"); // если в родителе конструктор - нужно передавать значения, конструктор чайлда перепишет родительский, если количество значений одинаково
        // echo $mops1->name;
        const yesterday = 6; //declaring a constant

        // echo Mops::retry; // echo const inside the class (may exist in parent)
        // echo Mops::aport(); // call static method without creating (may with) instance (can be in parent)

        //**************************************************************************

        abstract class faggOt {
            abstract function tyty();
        }

        class natural extends faggot {
            public function fdfd(){
                return 'fdfd';
            }

            public function tyty(){
                return 'tyty';
            }
        }
            
        $g = new natural();
        // echo $g->fdfd();
        ////////////////////////////////
      
		function table($rows = 8, $columns = 8, $color = "#cc0055") {
			echo "<div style='padding: 15px; background: aqua; display: inline-block;'>";

			$square1 = "<span style='width: 20px; float: left; height: 20px; background: black;'></span>";
			$square2 = "<span style='width: 20px; float: left; height: 20px; background: white;'></span>";
			$square3 = "<span style='width: 20px; float: left; height: 20px; background: {$color};'></span>";

			$array = [$square1, $square2, $square3];
			
			$r = 0;
			for($j = 0; $j<$columns; $j++) {
				$k = $r;
				for($i = 0; $i<$rows; $i++){
					echo $array[$k];
					$k++;
					if($k == 3) {
						$k = 0;
					}
				}
				
				$r++;
				if($r == 3) {
					$r = 0;
				}
				echo "<br>";
			}

			echo "</div>";

		}

		//table(8, 8, 'brown');

		// http://php.net/manual/ru/function.array-reduce.php

		preg_match_all(
			'#Сшит (?P<what>\w+) не по-(?P=what)овски#',
			"Сшит колпак не по-колпаковски",
			$m
			);
		echo "<pre>";
		var_dump($m);
		echo "</pre>";
		
?>
      </p>
    </body>
</html>