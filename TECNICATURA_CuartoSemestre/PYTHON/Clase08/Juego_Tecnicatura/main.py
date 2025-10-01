import pygame
import sys
import random
import os

from personaje import Personaje, Enemigo, Explosion
from constantes import  ANCHO_PANTALLA, ALTO_PANTALLA, COLOR_LASER, ASSETS_PATH


# Inicializa el juego
def mostrar_imagen_inicial(screen, imagen_path, duracion):
    imagen = pygame.image.load(imagen_path).convert()
    imagen = pygame.transform.scale(imagen, (ANCHO_PANTALLA, ALTO_PANTALLA))
    
    # Bucle para mostrar la imagen principal con una opacidad
    alpha = 255 #transparencia inicial completa
    Clock = pygame.time.Clock()
    
    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duracion # Duracion en milisegundos de (8000 milisegundos para 8 segundos)
    
    while pygame.time.get_ticks() - tiempo_inicial < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit
                sys.exit()
            
    
    keys = pygame.key.get_pressed()
    dx, dy = 0, 0
    if keys[pygame.K_LEFT]:
        dx = -5
    if keys[pygame.K_RIGHT]:
        dx = 5
    if keys[pygame.K_UP]:
        dy = -5
    if keys[pygame.K_DOWN]:
        dy = 5
        
    personaje.mover(dx, dy)
    
    if keys[pygame.K_SPACE]:
        personaje.lanzar_laser()
        sonido_laser.play()
        
    # Actualizar posicion de enemigos y manejar las colisiones 
    for enemigo in enemigos[:]: # Iterar para eliminar la lista principal
        enemigo.mover()
        if enemigo.rect.top > SCREEN_HEIGHT:
            enemigos.remove(enemigo)
            
    # Verificar colision con el laser
    for laser in personaje.laser[:]:
        if enemigo.rect.colliderect(laser.rect):
            explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
            enemigos.remove(enemigo) #elimina al enemigo
            personaje.laser.remove(laser) # elimina el laser
            sonido_explosion.play()
            puntos +=10  # incremente el puntaje
            break  #sale del bucle
        
    if enemigo.rect.colliderect(personaje.shape):
        if not personaje.recibir_dano():
            running = False # terminar el juego si la energia llega a 0
            
    # Generar enemigos de forma aleatoria
    if random.randint(1, 10) < 2:
        x = random.randint(0, SCREEN_WIDTH - 50) #Nos asegura de tener al enemigo dentro de la patantalla
        enemigo = Enemigo(x, 0)
        enemigo.append(enemigo)
        
    # Actualizar explosiones
    explosion = [ explosion for explosion in explosiones if explosion.actualizar()]
    
    # Actualizar el fondo cada 250 puntos
    if puntos > 0 and puntos % 250 == 0:
        if fondo_actual == fondo2:
            fondo_actual = fondo3
        else:
            fondo_actual = fondo2
            puntos += 10 # Aumenta puntos y cambia el fondo
            
    # Dibujar el fondo y objetos en la pantalla
    screen.blit(fondo_actual, (0, 0))
    personajes.dibujar(screen)
    for enemigo in enemigos:
        enemigo.mover(screen)
    for explosion in explosiones:
        explosion.dibujar (screen)
