package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

@Component
public class LibroForm extends JFrame {
LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField idTexto;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton eliminarButton;
    private JButton modificarButton;
    private JButton agregarButton;
    private JButton limpiarButton;
    private JButton salirButton;
    private JLabel imagenLabel;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroForm(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;
        iniciarForma();
        modificarButton.setEnabled(false);
        eliminarButton.setEnabled(false);
        agregarButton.addActionListener(e -> agregarLibro());
        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                cargarLibroSeleccionado();
                libroTexto.addKeyListener(new KeyAdapter() {
            @Override
            public void keyReleased(KeyEvent e) {
            }
        });

            }
        });
        modificarButton.addActionListener(e -> modificarLibro());
        eliminarButton.addActionListener(e -> eliminarLibro());
        limpiarButton.addActionListener(e -> limpiarFormulario());
        salirButton.addActionListener(e -> salir());
    }

    private void iniciarForma(){
    setContentPane(panel);
    setTitle("Tienda de Libros - Capy Books by Carpinchos Programando");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setVisible(true);
    setSize(900, 700);
    personalizarTabla();
    cargarImagen();

    // Para obtener las dimensiones de la ventana
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth())/2;
        int y = (tamanioPantalla.height - getHeight())/2;
        setLocation(x, y);
    }

    private void agregarLibro(){
        //Leer los valores del formulario
        if(libroTexto.getText().isEmpty()){
            mostrarMensaje("Ingrese el nombre del libro, por favor.");
            libroTexto.requestFocusInWindow();
            return;
        }
        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        if(precioTexto.getText().isEmpty()){
            mostrarMensaje("Ingrese el precio del libro, por favor.");
            precioTexto.requestFocusInWindow();
            return;
        }
        var precio = Double.parseDouble(precioTexto.getText());
        if(existenciasTexto.getText().isEmpty()){
            mostrarMensaje("Ingrese la cantidad de existencias, por favor.");
            existenciasTexto.requestFocusInWindow();
            return;
        }
        var existencias = Integer.parseInt(existenciasTexto.getText());

        // Verificar si el libro ya existe
        Libro libroExistente = this.libroServicio.buscarLibroPorNombreYAutor(nombreLibro, autor);
        if(libroExistente != null){
            mostrarMensaje("Este libro ya existe en la base de datos.");
            return;
        }

        //Crear el libro
        var libro = new Libro(null, nombreLibro, autor, precio, existencias);
        //libro.setNombreLibro(nombreLibro);
        //libro.setAutor(autor);
        //libro.setPrecio(precio);
        //libro.setExistencias(existencias);
        //Guardar el libro en la base de datos
        this.libroServicio.guardarLibro(libro);
        if(libro != null){
            mostrarMensaje("El libro se ha creado con exito.");
            limpiarFormulario();
            listarLibros();
        } else {
            mostrarMensaje("Ha ocurrido un error al crear el libro.");
        }
    }

    private void cargarLibroSeleccionado(){
       //Los indices de las columnas inician en 0
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            var idLibro = tablaLibros.getModel().getValueAt(renglon, 0).toString();
            idTexto.setText(idLibro);
            var nombreLibro = tablaLibros.getModel().getValueAt(renglon, 1).toString();
            libroTexto.setText(nombreLibro);
            var autor = tablaLibros.getModel().getValueAt(renglon, 2).toString();
            autorTexto.setText(autor);
            var precio = tablaLibros.getModel().getValueAt(renglon, 3).toString();
            precioTexto.setText(precio);
            var existencias = tablaLibros.getModel().getValueAt(renglon, 4).toString();
            existenciasTexto.setText(existencias);
            habilitarBotonesTabla();
        }
    }

    private void modificarLibro(){
        //Leer los valores del formulario
        if(this.idTexto.getText().equals("")){
            mostrarMensaje("Seleccione un libro de la tabla, por favor.");
        }
        else{
            //Verificamos que el nombre del libro no sea nulo
            if(libroTexto.getText().equals("")){
                mostrarMensaje("Ingrese el nombre del libro, por favor.");
                libroTexto.requestFocusInWindow();
                return;
            }
            //Llenamos el objeto libro a actualizar
            int idLibro = Integer.parseInt(idTexto.getText());
            var nombreLibro = libroTexto.getText();
            var autor = autorTexto.getText();
            if(precioTexto.getText().isEmpty()){
                mostrarMensaje("Ingrese el precio del libro, por favor.");
                precioTexto.requestFocusInWindow();
                return;
            }
            var precio = Double.parseDouble(precioTexto.getText());
            if(existenciasTexto.getText().isEmpty()){
                mostrarMensaje("Ingrese la cantidad de existencias, por favor.");
                existenciasTexto.requestFocusInWindow();
                return;
            }
            var existencias = Integer.parseInt(existenciasTexto.getText());
            //Crear el libro modificado
            var libro = new Libro(idLibro, nombreLibro, autor, precio, existencias);
            //Guardar el libro modificado en la base de datos
            this.libroServicio.guardarLibro(libro);
            mostrarMensaje("El libro se ha modificado con exito.");
            limpiarFormulario();
            listarLibros();
        }
    }

    private void eliminarLibro(){
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            var idLibro = tablaLibros.getModel().getValueAt(renglon, 0).toString();
            var libro = new Libro();
            libro.setIdLibro(Integer.parseInt(idLibro));
            this.libroServicio.eliminarLibro(libro);
            String nombreLibro = tablaLibros.getModel().getValueAt(renglon, 1).toString();
            mostrarMensaje("El libro '" + nombreLibro + "' se ha eliminado con éxito.");
            limpiarFormulario();
            listarLibros();
        }else{
            mostrarMensaje("Seleccione un libro de la tabla para eliminarlo, por favor.");
        }
    }

    private void limpiarFormulario(){
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
        libroTexto.requestFocusInWindow();
        idTexto.setText("");
        habilitarBotonesFormulario();
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        idTexto = new JTextField("");
        idTexto.setVisible(false);
        this.tablaModeloLibros = new DefaultTableModel(0,5){
            @Override
            public boolean isCellEditable(int row, int column){
                return false;
            }
        };
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);

        //Instanciar el objeto de JTable
        this.tablaLibros = new JTable(tablaModeloLibros);
        //Evitamos que se seleccionen varios registros
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        listarLibros();
    }

    private void personalizarTabla() {
        // Altura de filas
        tablaLibros.setRowHeight(28);

        // Fuente general
        tablaLibros.setFont(new Font("Poppins", Font.PLAIN, 13));

        // Encabezado estilizado
        JTableHeader header = tablaLibros.getTableHeader();
        header.setFont(new Font("Poppins", Font.BOLD, 14));
        header.setBackground(new Color(245, 241, 227)); // Crema suave
        header.setForeground(new Color(60, 60, 60));    // Texto oscuro

        // Alineación centrada para columnas numéricas
        DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
        centerRenderer.setHorizontalAlignment(SwingConstants.CENTER);
        tablaLibros.getColumnModel().getColumn(0).setCellRenderer(centerRenderer); // Id
        tablaLibros.getColumnModel().getColumn(1).setCellRenderer(centerRenderer); // Libro
        tablaLibros.getColumnModel().getColumn(2).setCellRenderer(centerRenderer); // Autor
        tablaLibros.getColumnModel().getColumn(3).setCellRenderer(centerRenderer); // Precio
        tablaLibros.getColumnModel().getColumn(4).setCellRenderer(centerRenderer); // Existencias

        // Ancho sugerido para columnas
        tablaLibros.getColumnModel().getColumn(1).setPreferredWidth(180); // Libro
        tablaLibros.getColumnModel().getColumn(2).setPreferredWidth(140); // Autor
    }

    private void listarLibros(){
        // limpiar la tabla.
        tablaModeloLibros.setRowCount(0);
        //Obtener los libros desde la base de datos
        var libros = libroServicio.listarLibros();
        //Recorrer la lista de libros y agregarlos a la tabla
        libros.forEach(libro -> {
            //Creamos un registro para la tabla
            Object[] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias(),
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });
    }

    private void habilitarBotonesFormulario(){
        agregarButton.setEnabled(true);
        modificarButton.setEnabled(false);
        eliminarButton.setEnabled(false);
    }

    private void habilitarBotonesTabla(){
        agregarButton.setEnabled(false);
        modificarButton.setEnabled(true);
        eliminarButton.setEnabled(true);
    }

    private void salir(){
        var respuesta = JOptionPane.showConfirmDialog(this,
                "¿Está seguro que desea salir?",
                "Salir",
                JOptionPane.YES_NO_OPTION);
        if(respuesta == JOptionPane.YES_OPTION){
            System.exit(0);
        }
    }

    private void cargarImagen(){
        try {
            // Cargar la imagen desde resources
            var imagePath = getClass().getResource("/imagenes/CapyBook.png");
            if(imagePath != null){
                ImageIcon icono = new ImageIcon(imagePath);
                // Redimensionar la imagen (ajusta el tamaño según prefieras)
                Image imagen = icono.getImage().getScaledInstance(150, 170, Image.SCALE_SMOOTH);
                imagenLabel.setIcon(new ImageIcon(imagen));
            } else {
                // Si no encuentra la imagen, mostrar un texto alternativo
                imagenLabel.setText("📚");
                imagenLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 40));
            }
        } catch (Exception e) {
            // En caso de error, mostrar emoji como alternativa
            imagenLabel.setText("📚");
            imagenLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 40));
        }
    }
}