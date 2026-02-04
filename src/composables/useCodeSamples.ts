/**
 * Code samples management composable
 */
import { ref, computed } from 'vue';
import type { CodeSamples } from '@/types';

// Code samples - this would be generated from the samples
const CODE_SET: CodeSamples = {
  c: `#include <stdio.h>

int main() {
    int num = 10;
    int* ptr = &num;

    printf("The value of num is %d\\n", num);
    printf("The value of ptr is %p\\n", ptr);
    printf("The value that ptr points to is %d\\n", *ptr);

    return 0;
}
`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, there!" << std::endl;
    std::cout << "General Grievous!" << std::endl;

    return 0;
}
`,
  csharp: `public class Startup
{
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseRouting();
        app.UseCors(CorsOptions.CorsPolicyName);
        app.UseEndpoints(endpoints => {
            endpoints.MapControllers();
            endpoints.MapSwagger();
        });
    }
}
`,
  go: `package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    sum := add(3, 4)
    fmt.Println("Sum:", sum)
}
`,
  java: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 10;
        int sum = add(a, b);
        System.out.println("Sum: " + sum);
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
`,
  kotlin: `fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    val evenNumbers = numbers.map { it * 2 }.filter { it % 2 == 0 }
    val sumOfEvenNumbers = evenNumbers.sum()

    println("Original numbers: $numbers")
    println("Even numbers: $evenNumbers")
    println("Sum of even numbers: $sumOfEvenNumbers")
}

fun factorial(n: Int): Int {
    return if (n == 0) 1 else n * factorial(n - 1)
}
`,
  perl: `sub printNumbers {
    my $n = shift;
    for (my $i = 1; $i <= $n; $i++) {
        print "$i\\n";
    }
}

printNumbers(10);
`,
  python: `def fibonacci(n):
    a, b = 0, 1
    while a < n:
        print(a)
        a, b = b, a + b

fibonacci(100)
`,
  r: `# Generate a sequence of numbers from 0 to 2*pi
x <- seq(0, 2*pi, length.out = 100)

# Compute the sine of each number
y <- sin(x)

# Plot the sine wave
plot(x, y, type = "l", col = "blue", lwd = 2, 
    main = "Sine Wave", xlab = "x", ylab = "sin(x)")

# Add grid lines for better visualization
grid()
`,
  ruby: `name = "John"
age = 30

if age < 18
    puts "#{name} is a minor."
else
    puts "#{name} is an adult."
end

5.times do |i|
    puts "This is message number #{i + 1}."
end
`,
  rust: `fn main() {
    let name = "Rust";
    let version = 1.56;

    println!("Hello, {}!", name);
    println!("Current version: {}", version);

    let sum = add(5, 10);
    println!("Sum of 5 and 10 is: {}", sum);
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}
`,
  scala: `val counter = Var(0)

// create a counter button that increments on-click
def counterButton() = button(
  tpe := "button",
  "count is ",
  child.text <-- counter,
  onClick --> { event => counter.update(c => c + 1) },
)
val app = dom.document.getElementById("app")
render(app, counterButton())
`,
  swift: `let numbers = [1, 2, 3, 4, 5]

let doubledNumbers = numbers.map { $0 * 2 }

print(doubledNumbers)
`,
  css: `.action-wrapper .action {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    align-self: center;
    cursor: pointer;
    transition: 0.3s;
}
`,
  html: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello, world!</title>
    </head>
    <body>
        <h1>Hello, world!</h1>
    </body>
</html>
`,
  javascript: `function fibonacci(n) {
    let a = 0, b = 1;
    while (a < n) {
        console.log(a);
        [a, b] = [b, a + b];
    }
}
`,
  php: `<?php
$languages = array("JavaScript", "Python", "PHP", "Ruby", "Java");

foreach ($languages as $language) {
    echo "I like $language.\\n";
}
?>`,
  typescript: `function fibonacci(n: number): void {
    let a: number = 0, b: number = 1;
    while (a < n) {
        console.log(a);
        [a, b] = [b, a + b];
    }
}
`,
  bash: `#!/bin/bash

name="John"
age=30

if [ $age -lt 18 ]; then
    echo "$name is a minor."
else
    echo "$name is an adult."
fi
`,
  batch: `@echo off

set name=John
set age=30

if %age% lss 18 (
    echo %name% is a minor.
) else (
    echo %name% is an adult.
)
`,
  lua: `function printNumbers(n)
for i = 1, n do
    print(i)
end
end

printNumbers(10)
`,
  powershell: `$name = "John"

for ($i = 1; $i -le 5; $i++) {
    Write-Host "Hello, $name! This is message number $i."
}
`,
  json: `{
    "name": "John Doe",
    "age": 30,
    "email": "johndoe@example.com",
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
    }
}
`,
  latex: `The Pythagorean theorem states that
for a right triangle with legs of
length $a$ and $b$ and hypotenuse of
length $c$, the following equation holds:

$$a^2 + b^2 = c^2$$
`,
  markdown: `# My Shopping List

> This is a good list.

- Apples
- Bananas
- Oranges
- Strawberries
`,
  toml: `# This is a TOML document

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00

[database]
enabled = true
ports = [ 8000, 8001, 8002 ]
data = [ ["delta", "phi"], [3.14] ]
temp_targets = { cpu = 79.5, case = 72.0 }

[servers]

[servers.alpha]
ip = "10.0.0.1"
role = "frontend"

[servers.beta]
ip = "10.0.0.2"
role = "backend"`,
  xml: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title>Star Wars</title>
    <author>George Lucas</author>
    <price>10.99</price>
  </book>
  <book category="non-fiction">
    <title>The Silent Spring</title>
    <author>Rachel Carson</author>
    <price>7.99</price>
  </book>
</bookstore>
`,
  yaml: `- title: The Great Gatsby
  author: F. Scott Fitzgerald
  year: 1925
  publisher: Scribner
- title: To Kill a Mockingbird
  author: Harper Lee
  year: 1960
  publisher: J. B. Lippincott & Co.
- title: 1984
  author: George Orwell
  year: 1949
  publisher: Secker & Warburg
- title: The Catcher in the Rye
  author: J. D. Salinger
  year: 1951
  publisher: Little, Brown and Company
`,
  cmake: `cmake_minimum_required(VERSION 3.26)
project(MIoC)

set(CMAKE_CXX_STANDARD 11)

# Add all source files
file(GLOB_RECURSE SRC_LIST CONFIGURE_DEPENDS src/*.cpp)

# Add final target.
add_executable(\${CMAKE_PROJECT_NAME} \${SRC_LIST})

# dependency
add_subdirectory(mioc)
target_link_libraries(\${CMAKE_PROJECT_NAME} PRIVATE mioc)
`,
  docker: `# PatBoot Dockerfile

FROM openjdk:17-jdk-slim

ARG VERSION

COPY target/PatBoot-\${VERSION}.jar /application.jar

EXPOSE 8080

CMD ["java", "-jar", "/application.jar"]
`,
  makefile: `CC = gcc
CFLAGS = -Wall -Wextra -pedantic

all: program

program: main.o utils.o
    $(CC) $(CFLAGS) -o program main.o utils.o

main.o: main.c utils.h
    $(CC) $(CFLAGS) -c main.c

utils.o: utils.c utils.h
    $(CC) $(CFLAGS) -c utils.c

clean:
    rm -f program *.o
`,
  sql: `CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
);

INSERT INTO users (id, name, email)
VALUES (1, 'John Doe', 'johndoe@example.com'),
       (2, 'Jane Smith', 'janesmith@example.com'),
       (3, 'Bob Johnson', 'bobjohnson@example.com');

SELECT * FROM users;
`,
  llvm: `; Function Attrs: noinline nounwind optnone uwtable 
define dso_local i32 @add(i32 %0, i32 %1) #0 {
    %3 = alloca i32, align 4
    %4 = alloca i32, align 4
    store i32 %0, i32* %3, align 4
    store i32 %1, i32* %4, align 4
    %5 = load i32, i32* %3, align 4
    %6 = load i32, i32* %4, align 4
    %7 = add i32 %5, %6
    ret i32 %7
}
`,
  nasm: `section .data
    msg db 'Ready, assemble!', 0xA
    len equ $ - msg

section .text
    global _start

_start:
    mov eax, 4          ; syscall number for sys_write
    mov ebx, 1          ; file descriptor 1 (stdout)
    mov ecx, msg        ; pointer to the message
    mov edx, len        ; length of the message
    int 0x80            ; make the syscall

    mov eax, 1          ; syscall number for sys_exit
    xor ebx, ebx        ; exit status 0
    int 0x80            ; make the syscall
`,
  coq: `Section Hilbert_Axiom_S.
Variable P Q R : Prop.
Theorem hilbert_axiom_s : (P -> Q -> R) -> (P -> Q) -> P -> R.
Proof.
    intros H1 H2 H3.
    apply H1.
    exact H3.
    exact (H2 H3).
Qed.
End Hilbert_Axiom_S.
`,
  diff: `- Jedi Order
+ Sith Empire
- Kamino
- Alderaan
+ Mandalore
`,
  glsl: `#version 450 core

layout(location = 0) out vec4 o_Color;

struct VertexOutput
{
    vec4 Color;
};

layout (location = 0) in VertexOutput Input;

void main()
{
    o_Color = Input.Color;
}
`,
  matlab: `% Define the range of x values
x = linspace(0, 2*pi, 100);

% Calculate the sine of each x value
y = sin(x);

% Create a plot of the sine wave
figure;
plot(x, y);

% Add title and labels
title('Sine Wave');
xlabel('x');
ylabel('sin(x)');

% Display grid
grid on;
`,
  verilog: `module counter(
    input clk,
    input rst,
    output reg [7:0] count
);

always @(posedge clk, posedge rst) begin
    if (rst) begin
        count <= 0;
    end else begin
        count <= count + 1;
    end
end

endmodule
`,
};

/**
 * Composable for code samples management
 */
export function useCodeSamples() {
  const currentLanguage = ref<string>('c');

  const languageCount = computed(() => Object.keys(CODE_SET).length);

  /**
   * Get code sample for a language
   */
  function getCode(lang: string): string {
    if (hasLanguage(lang)) {
      return CODE_SET[lang];
    }
    return 'Oops, write your own code!';
  }

  /**
   * Check if language exists
   */
  function hasLanguage(lang: string): boolean {
    return Object.prototype.hasOwnProperty.call(CODE_SET, lang);
  }

  /**
   * Get a random language
   */
  function getRandomLanguage(avoid: string | null = null): string {
    const languages = Object.keys(CODE_SET);
    let lang = languages[Math.floor(Math.random() * languages.length)];

    while (lang === avoid && languages.length > 1) {
      lang = languages[Math.floor(Math.random() * languages.length)];
    }

    return lang;
  }

  /**
   * Set current language
   */
  function setCurrentLanguage(lang: string): void {
    currentLanguage.value = lang;
  }

  return {
    currentLanguage,
    languageCount,
    getCode,
    hasLanguage,
    getRandomLanguage,
    setCurrentLanguage,
  };
}
