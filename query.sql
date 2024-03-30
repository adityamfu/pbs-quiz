CREATE TABLE bio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    npm VARCHAR(20) NOT NULL,
    kelas VARCHAR(50),
    alamat VARCHAR(255)
);

INSERT INTO bio (nama, npm, kelas, alamat) VALUES 
('John Doe', '1234567890', 'A1', 'Jl. Merdeka No. 123'),
('Jane Smith', '0987654321', 'B2', 'Jl. Jenderal Sudirman No. 456'),
('Michael Johnson', '1357902468', 'C3', 'Jl. Pahlawan No. 789');