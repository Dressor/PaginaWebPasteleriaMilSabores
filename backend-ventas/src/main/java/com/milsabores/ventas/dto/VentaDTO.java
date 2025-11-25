package com.milsabores.ventas.dto;

import java.util.List;

public class VentaDTO {
    public String rut;
    public String nombre;
    public String email;
    public String fechaNacimiento;
    public String celular;
    public String direccion;
    public List<ItemVentaDTO> items;
    public Double subtotal;
    public Double tax;
    public Double total;
}
