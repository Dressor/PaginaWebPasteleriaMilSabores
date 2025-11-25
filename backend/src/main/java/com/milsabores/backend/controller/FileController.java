package com.milsabores.backend.controller;

import com.milsabores.backend.model.FileEntity;
import com.milsabores.backend.repository.FileRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/files")
public class FileController {
    private final FileRepository fileRepository;

    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file) throws IOException {
        FileEntity f = new FileEntity();
        f.setFilename(file.getOriginalFilename());
        f.setContentType(file.getContentType());
        f.setData(file.getBytes());
        FileEntity saved = fileRepository.save(f);
        return ResponseEntity.ok().body(saved.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> download(@PathVariable Long id) {
        return fileRepository.findById(id).map(f -> ResponseEntity.ok().contentType(MediaType.parseMediaType(f.getContentType())).body(f.getData()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
