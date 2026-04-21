# AST Code & Play

## Descripción del Sistema

El proyecto consiste en el diseño y desarrollo de una plataforma de videojuegos orientada al usuario, que combina un ecosistema de juegos personalizados con una arquitectura que integra recepción de feedback y soporte técnico, permitiendo que la evolución del catálogo sea impulsada directamente por la comunidad.

## Historias de Usuario

| ID   | Nombre                          | Issue  | 
|------|---------------------------------|--------| 
| US-01 | Tutorial didáctico             | [#1](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/1)   | 
| US-02 | Sistema de compras             | [#2](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/2)   |
| US-03 | Lista de conexiones y estado   | [#3](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/3)   |  
| US-04 | Configuración de accesibilidad | [#4](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/4)   |  
| US-05 | Registro de actividad          | [#5](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/5)   |  
| US-06 | Ver logros                     | [#6](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/6)   |  
| US-07 | Evitar pérdida de progreso     | [#7](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/7)   |  
| US-08 | Precisión de hitboxes          | [#8](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/8)   |
| US-09 | Visualizar intento previo      | [#9](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/9)   |  
| US-10 | Contador de intentos           | [#10](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/issues/10) |  

## Requisitos Extrafuncionales

Ver [ReqExtrafuncionales.md](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/blob/main/ReqExtrafuncionales.md)

## Entidades del Dominio
```mermaid
classDiagram
direction LR

class MainMenu {
  +_on_play_button_pressed()
  +_on_exit_button_pressed()
}

class GameScene {
}

class Player {
  +speed: float
  +velocity: Vector2
  +direction: Vector2
  +_physics_process()
}

class Enemy {
  +speed: float
  +waypoints: Array
  +angle: float
  +length: float
  +direction: Vector2
  +current_index: int
  +game_over_triggered: bool
  +_physics_process()
  +is_in_cone()
  +has_line_of_sight()
  +_on_timer_timeout()
}

class Goal {
  +activated: bool
  +next_scene: String
  +_on_body_entered()
  +_go_to_next_scene()
}

class GameOver {
  +_on_menu_pressed()
  +_on_try_again_pressed()
}

class DemoCompleted {
  +_on_button_pressed()
  +_on_play_again_pressed()
}

MainMenu --> GameScene : load
GameScene --> Player : contains
GameScene --> Enemy : contains
GameScene --> Goal : contains
Enemy --> Player : detect
Enemy --> GameOver : change_scene
Goal --> Player : detect
Goal --> DemoCompleted : change_scene
GameOver --> MainMenu : menu
GameOver --> GameScene : retry
DemoCompleted --> MainMenu : menu
DemoCompleted --> GameScene : play_again
```

## Mockups

| Mockup | Historia de usuario relacionada | 
|--------|----------------------------------| 
| [Prototipo en Figma](https://www.figma.com/design/bwICFC1WD77lRQX0Z2WnyY/Splinter-Gear-Liquid-X?node-id=0-1&p=f&t=U9F0MKpkNRh91lEm-0) | US-01 al US-10 | 

## Diseño Arquitectónico

Ver [Arquitectura.md](https://github.com/AST-Code-Play/Proyecto-Fundamentos-De-Software/blob/main/Arquitectura.md)

## Responsabilidades del equipo 

| Integrante | Rol | Ítems de la rúbrica a cargo | 
|------------|-----|----------------------------| 
| Martín Loyola | Product Owner | 2.3 Mockups| 
| Jesús Carvajal | Scrum Master  | 1.1 Historias de Usuario, 2.4 Entidades del dominio|
| Cristobal Cartagena | Developer | 1.1 Historias de Usuario, 1.2 Diseño de requerimientos, 2.2 Diseño arquitectonico |
| Bruno Mora | Developer | 1.1 Historias de Usuario, 1.2 Diseño de requerimientos, 2.4 Entidades del dominio  |
| Jesús Cortés | Developer | 1.1 Historias de Usuario, 2.2 Diseño arquitectonico |

