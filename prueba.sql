-- cargo
-- cargo, sueldo

-- trabajador
-- idtrab, nombre, cargo

-- planilla
-- idtrab

SELECT 
    t.idtrab AS id,
    t.nombre AS trabajador,
    c.cargo AS cargo,
    c.sueldo AS sueldobruto,
    (c.sueldo * 0.18) AS igv,
    (c.sueldo * 0.11) AS afp,
    (igv + afp) AS descuento,
    (c.sueldo * 0.5) AS gratificacion,
    (c.sueldo + gratificacion - descuento) AS sueldoneto
FROM planilla AS p
INNER JOIN trabajador AS t
    ON p.idtrab = t.idtrab
INNER JOIN cargo AS c
    ON t.cargo = c.cargo