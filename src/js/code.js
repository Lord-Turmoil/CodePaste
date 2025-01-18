const CODE_C = `#include <stdio.h>

int main() {
    int num = 10;
    int* ptr = &num;

    printf("The value of num is %d\\n", num);
    printf("The value of ptr is %p\\n", ptr);
    printf("The value that ptr points to is %d\\n", *ptr);

    return 0;
}`;

const CODE_CPP = `#include <iostream>

int main() {
    std::cout << "Hello, there!" << std::endl;
    std::cout << "General Grievous!" << std::endl;

    return 0;
}`;

const CODE_CSHARP = `public class Startup
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
}`;

const CODE_GO = `package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`;

const CODE_JAVA = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`;

const CODE_PYTHON = `def fibonacci(n):
a, b = 0, 1
while a < n:
    print(a)
    a, b = b, a + b

fibonacci(100)`;

const CODE_RUST = `fn main() {
    println!("Hello, world!");
}`;

const CODE_SWIFT = `let numbers = [1, 2, 3, 4, 5]

let doubledNumbers = numbers.map { $0 * 2 }

print(doubledNumbers)`;

const CODE_PERL = `sub printNumbers {
    my $n = shift;
    for (my $i = 1; $i <= $n; $i++) {
        print "$i\\n";
    }
}

printNumbers(10);`;

const CODE_RUBY = `name = "John"
age = 30

if age < 18
    puts "#{name} is a minor."
else
    puts "#{name} is an adult."
end

5.times do |i|
    puts "This is message number #{i + 1}."
end`;

const CODE_HTML = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello, world!</title>
    </head>
    <body>
        <h1>Hello, world!</h1>
    </body>
</html>`;

const CODE_CSS = `.action-wrapper .action {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    align-self: center;
    cursor: pointer;
    transition: 0.3s;
}`;

const CODE_JS = `function fibonacci(n) {
    let a = 0, b = 1;
    while (a < n) {
        console.log(a);
        [a, b] = [b, a + b];
    }
}`;

const CODE_TS = `function fibonacci(n: number): void {
    let a: number = 0, b: number = 1;
    while (a < n) {
        console.log(a);
        [a, b] = [b, a + b];
    }
}`;

const CODE_PHP = `<?php
$languages = array("JavaScript", "Python", "PHP", "Ruby", "Java");

foreach ($languages as $language) {
    echo "I like $language.\\n";
}
?>`;


const CODE_BASH = `#!/bin/bash

name="John"
age=30

if [ $age -lt 18 ]; then
    echo "$name is a minor."
else
    echo "$name is an adult."
fi`;

const CODE_POWERSHELL = `$name = "John"

for ($i = 1; $i -le 5; $i++) {
    Write-Host "Hello, $name! This is message number $i."
}`;

const CODE_BATCH = `@echo off

set name=John
set age=30

if %age% lss 18 (
    echo %name% is a minor.
) else (
    echo %name% is an adult.
)`;

const CODE_LUA = `function printNumbers(n)
for i = 1, n do
    print(i)
end
end

printNumbers(10)`;

const CODE_XML = `<?xml version="1.0" encoding="UTF-8"?>
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
</bookstore>`;

const CODE_JSON = `{
    "name": "John Doe",
    "age": 30,
    "email": "johndoe@example.com",
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
    }
}`;

const CODE_YAML = `- title: The Great Gatsby
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
  publisher: Little, Brown and Company`;

const CODE_MARKDOWN = `# My Shopping List

- Apples
- Bananas
- Oranges
- Strawberries`;

const CODE_LATEX = `The Pythagorean theorem states that
for a right triangle with legs of
length $a$ and $b$ and hypotenuse of
length $c$, the following equation holds:

$$a^2 + b^2 = c^2$$`;

const CODE_MAKEFILE = `CC = gcc
CFLAGS = -Wall -Wextra -pedantic

all: program

program: main.o utils.o
    $(CC) $(CFLAGS) -o program main.o utils.o

main.o: main.c utils.h
    $(CC) $(CFLAGS) -c main.c

utils.o: utils.c utils.h
    $(CC) $(CFLAGS) -c utils.c

clean:
    rm -f program *.o`;

const CODE_CMAKE = `cmake_minimum_required(VERSION 3.26)
project(MIoC)

set(CMAKE_CXX_STANDARD 11)

# Add all source files
file(GLOB_RECURSE SRC_LIST CONFIGURE_DEPENDS src/*.cpp)

# Add final target.
add_executable(\${CMAKE_PROJECT_NAME} \${SRC_LIST})

# dependency
add_subdirectory(mioc)
target_link_libraries(\${CMAKE_PROJECT_NAME} PRIVATE mioc)
`;

const CODE_DOCKER = `# PatBoot Dockerfile

FROM openjdk:17-jdk-slim

ARG VERSION

COPY target/PatBoot-\${VERSION}.jar /application.jar

EXPOSE 8080

CMD ["java", "-jar", "/application.jar"]
`;

const CODE_SQL = `CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
);

INSERT INTO users (id, name, email)
VALUES (1, 'John Doe', 'johndoe@example.com'),
       (2, 'Jane Smith', 'janesmith@example.com'),
       (3, 'Bob Johnson', 'bobjohnson@example.com');

SELECT * FROM users;`;

const CODE_NASM = `section .data
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
`;

const CODE_LLVM = `; Function Attrs: noinline nounwind optnone uwtable 
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
`;

const CODE_VERILOG = `module counter(
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

endmodule`;

const CODE_GIT_DIFF = `
- Jedi Order
+ Sith Empire
- Kamino
- Alderaan
+ Mandalore
`;

const CODE_MATLAB = `% Define the range of x values
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
`;

const CODE_GLSL = `#version 450 core

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
`;

const CODE_SET = {
    c: CODE_C,
    cpp: CODE_CPP,
    csharp: CODE_CSHARP,
    go: CODE_GO,
    java: CODE_JAVA,
    python: CODE_PYTHON,
    rust: CODE_RUST,
    swift: CODE_SWIFT,
    perl: CODE_PERL,
    ruby: CODE_RUBY,
    bash: CODE_BASH,
    powershell: CODE_POWERSHELL,
    batch: CODE_BATCH,
    lua: CODE_LUA,
    html: CODE_HTML,
    css: CODE_CSS,
    javascript: CODE_JS,
    typescript: CODE_TS,
    php: CODE_PHP,
    xml: CODE_XML,
    json: CODE_JSON,
    yaml: CODE_YAML,
    markdown: CODE_MARKDOWN,
    latex: CODE_LATEX,
    makefile: CODE_MAKEFILE,
    cmake: CODE_CMAKE,
    docker: CODE_DOCKER,
    sql: CODE_SQL,
    nasm: CODE_NASM,
    llvm: CODE_LLVM,
    verilog: CODE_VERILOG,
    diff: CODE_GIT_DIFF,
    matlab: CODE_MATLAB,
    glsl: CODE_GLSL,
};

class CodeSet {
    constructor(code) {
        this.code = code;
        this.count = Object.keys(code).length;
    }

    /**
     * Get a random language code.
     * @param {string} avoid the language to avoid
     */
    getRandomLanguage(avoid) {
        if (avoid === null) {
            avoid = "";
        }
        var lang = this.nextRandomLanguage();
        while (lang === avoid) {
            lang = this.nextRandomLanguage();
        }
        return lang;
    }

    /**
     * Get the code for the given language.
     * @param {string} lang the language of the code
     * @returns the code, or dummy if language not available
     */
    getCode(lang) {
        if (this.hasLanguage(lang)) {
            return this.code[lang];
        }
        return "Oops, write your own code!";
    }

    hasLanguage(lang) {
        return Object.prototype.hasOwnProperty.call(this.code, lang);
    }

    nextRandomLanguage() {
        const target = Math.floor(Math.random() * this.count);
        var i = 0;
        for (const key of Object.keys(this.code)) {
            if (i === target) {
                return key;
            }
            i++;
        }
    }
};

const codeset = new CodeSet(CODE_SET);

export default codeset;
